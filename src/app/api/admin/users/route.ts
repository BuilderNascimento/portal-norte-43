/**
 * API para gerenciar usuários (apenas admins)
 */

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { getCurrentUser } from '@/lib/auth/supabase-auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['admin', 'collaborator']).default('collaborator'),
  can_create: z.boolean().default(true),
  can_edit: z.boolean().default(true),
  can_delete: z.boolean().default(false),
  can_review: z.boolean().default(false),
  can_manage_users: z.boolean().default(false),
  allowed_categories: z.array(z.string()).default([]),
  allowed_cities: z.array(z.string()).default([]),
});

export async function POST(request: Request) {
  try {
    // Verificar autenticação (será feito via middleware no futuro)
    // Por enquanto, verificar manualmente
    const currentUser = await getCurrentUser();
    
    if (!currentUser?.author || currentUser.author.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado. Apenas admins podem criar usuários.' },
        { status: 403 }
      );
    }

    if (!currentUser.author.permissions.can_manage_users) {
      return NextResponse.json(
        { error: 'Você não tem permissão para gerenciar usuários.' },
        { status: 403 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase admin não configurado.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.errors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        name: data.name,
        role: data.role,
      },
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Erro ao criar usuário' },
        { status: 500 }
      );
    }

    // Aguardar trigger criar o autor
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Atualizar permissões do autor criado
    const { data: authorData } = await supabaseAdmin
      .from('authors')
      .select('id')
      .eq('auth_user_id', authData.user.id)
      .single();

    if (authorData) {
      await supabaseAdmin
        .from('authors')
        .update({
          can_create: data.can_create,
          can_edit: data.can_edit,
          can_delete: data.can_delete,
          can_review: data.can_review,
          can_manage_users: data.can_manage_users,
          allowed_categories: data.allowed_categories,
          allowed_cities: data.allowed_cities,
        })
        .eq('id', authorData.id);
    }

    return NextResponse.json({
      success: true,
      message: 'Usuário criado com sucesso',
      user: {
        id: authData.user.id,
        email: authData.user.email,
      },
    });
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser?.author || currentUser.author.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase admin não configurado' },
        { status: 500 }
      );
    }

    const { data: authors, error } = await supabaseAdmin
      .from('authors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      users: authors || [],
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

