#!/usr/bin/env python3
"""
Script para testar se os feeds RSS estão funcionando
"""

import feedparser
import sys
from config import Config

def test_feeds():
    """Testa todos os feeds RSS configurados"""
    print("=" * 70)
    print("TESTANDO FEEDS RSS")
    print("=" * 70)
    print()
    
    working_feeds = []
    broken_feeds = []
    empty_feeds = []
    
    for feed_config in Config.RSS_FEEDS:
        name = feed_config['name']
        url = feed_config['url']
        
        print(f"Testando: {name}")
        print(f"   URL: {url}")
        
        try:
            feed = feedparser.parse(url)
            
            # Verifica se há erro de parsing
            if feed.bozo and feed.bozo_exception:
                error_msg = str(feed.bozo_exception)
                print(f"   [ERRO] {error_msg[:60]}")
                broken_feeds.append({
                    'name': name,
                    'url': url,
                    'error': error_msg
                })
                print()
                continue
            
            # Verifica se há itens
            if not feed.entries:
                print(f"   [VAZIO] Feed nao retornou itens")
                empty_feeds.append({
                    'name': name,
                    'url': url
                })
                print()
                continue
            
            # Sucesso
            item_count = len(feed.entries)
            latest_title = feed.entries[0].get('title', 'Sem titulo')[:60]
            print(f"   [OK] {item_count} itens encontrados")
            print(f"   Ultima: {latest_title}...")
            working_feeds.append({
                'name': name,
                'url': url,
                'count': item_count
            })
            print()
            
        except Exception as e:
            error_msg = str(e)
            print(f"   [ERRO] {error_msg[:60]}")
            broken_feeds.append({
                'name': name,
                'url': url,
                'error': error_msg
            })
            print()
    
    # Resumo
    print("=" * 70)
    print("RESUMO")
    print("=" * 70)
    print(f"Feeds funcionando: {len(working_feeds)}")
    print(f"Feeds vazios: {len(empty_feeds)}")
    print(f"Feeds com erro: {len(broken_feeds)}")
    print()
    
    if working_feeds:
        print("FEEDS FUNCIONANDO:")
        for feed in working_feeds:
            print(f"   - {feed['name']}: {feed['count']} itens")
        print()
    
    if empty_feeds:
        print("FEEDS VAZIOS:")
        for feed in empty_feeds:
            print(f"   - {feed['name']}")
        print()
    
    if broken_feeds:
        print("FEEDS COM ERRO:")
        for feed in broken_feeds:
            print(f"   - {feed['name']}")
            print(f"     Erro: {feed['error'][:80]}")
        print()
    
    return len(working_feeds), len(empty_feeds), len(broken_feeds)

if __name__ == '__main__':
    working, empty, broken = test_feeds()
    
    if broken > 0:
        print("ATENCAO: Alguns feeds estao com erro e devem ser corrigidos!")
        sys.exit(1)
    elif empty > 0:
        print("Alguns feeds estao vazios (pode ser normal)")
        sys.exit(0)
    else:
        print("Todos os feeds estao funcionando!")
        sys.exit(0)

