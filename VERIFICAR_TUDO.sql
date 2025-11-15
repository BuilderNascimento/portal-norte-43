-- ============================================
-- VERIFICAÇÃO COMPLETA - Execute este SQL
-- ============================================

-- Verificar se TUDO está conectado corretamente
SELECT 
  '=== VERIFICAÇÃO COMPLETA ===' as info;

SELECT 
  u.id as auth_user_id,
  u.email as auth_email,
  u.email_confirmed_at IS NOT NULL as email_confirmado,
  a.id as author_id,
  a.email as author_email,
  a.role,
  a.auth_user_id = u.id as ids_conectados,
  a.is_active as autor_ativo,
  a.can_create,
  a.can_edit,
  a.can_delete,
  a.can_review,
  a.can_manage_users,
  CASE 
    WHEN u.id IS NULL THEN '❌ ERRO: Usuário não existe no auth.users - CRIE AGORA!'
    WHEN a.id IS NULL THEN '❌ ERRO: Autor não existe'
    WHEN a.auth_user_id IS NULL THEN '❌ ERRO: auth_user_id não conectado'
    WHEN a.auth_user_id != u.id THEN '❌ ERRO: auth_user_id errado'
    WHEN u.email_confirmed_at IS NULL THEN '❌ ERRO: Email não confirmado'
    WHEN a.is_active = false THEN '❌ ERRO: Autor inativo'
    WHEN a.role != 'admin' THEN '❌ ERRO: Não é admin'
    ELSE '✅ TUDO CORRETO! Pode fazer login!'
  END as status_final
FROM auth.users u
LEFT JOIN authors a ON a.auth_user_id = u.id
WHERE u.email = 'nego2022fr@gmail.com';

