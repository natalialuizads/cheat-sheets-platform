"use client";

import { CheatsheetCard } from '@/components/cheatsheet/CheatsheetCard';
import { CheatsheetCommand } from '@/components/cheatsheet/CheatsheetCommand';
import { CheatsheetDetail } from '@/components/cheatsheet/CheatsheetDetail';
import { GitBranch, Terminal, Tag, Package, Key } from "lucide-react";

export default function Git() {
  return (
    <CheatsheetDetail
      title="Git"
      description="Guia completo de Git com comandos essenciais, boas práticas e fluxo de trabalho"
      icon={GitBranch}
      iconColor="text-orange-600"
    >
      <CheatsheetCard title="Configuração Inicial" icon={Terminal}>
        <CheatsheetCommand
          command={'git config --global user.name "Seu Nome"'}
          description="Define o nome que será associado aos seus commits globalmente."
        />
        <CheatsheetCommand
          command={'git config --global user.email "seu@email.com"'}
          description="Define o email que será associado aos seus commits globalmente."
        />
        <CheatsheetCommand
          command="git config --global init.defaultBranch main"
          description="Define 'main' como o nome da branch padrão para novos repositórios."
        />
        <CheatsheetCommand
          command={'git config --global core.editor "code --wait"'}
          description="Define o VS Code como editor padrão para mensagens de commit. O Git aguardará o arquivo ser salvo e fechado."
        />
      </CheatsheetCard>

      <CheatsheetCard title="Comandos Básicos" icon={Terminal}>
        <CheatsheetCommand
          command="git init"
          description="Inicializa um novo repositório Git no diretório atual."
        />
        <CheatsheetCommand
          command="git clone <url>"
          description="Cria uma cópia local de um repositório remoto."
        />
        <CheatsheetCommand
          command="git status"
          description="Exibe o estado do diretório de trabalho e da área de staging."
        />
        <CheatsheetCommand
          command="git add <arquivo>"
          lang="shell"
          description="Adiciona um arquivo à área de staging para o próximo commit."
          example={`git add index.js
git add . # Adiciona todos os arquivos modificados`}
        />
        <CheatsheetCommand
          command="git add -p"
          description="Adiciona mudanças de forma interativa, permitindo selecionar trechos (hunks) específicos de um arquivo para commitar."
        />
        <CheatsheetCommand
          command={'git commit -m "Mensagem do commit"'}
          description="Grava as mudanças da área de staging no histórico do repositório."
        />
        <CheatsheetCommand
          command='git commit -am "Mensagem do commit"'
          description="Prepara (adiciona) e faz o commit de todos os arquivos já rastreados em um único passo."
        />
        <CheatsheetCommand
          command="git commit --amend"
          description="Altera a mensagem do último commit ou adiciona novas mudanças a ele."
        />
      </CheatsheetCard>

      <CheatsheetCard title="Branches & Merging" icon={GitBranch}>
        <CheatsheetCommand
          command="git branch"
          description="Lista todas as branches locais. A branch atual é destacada."
        />
        <CheatsheetCommand
          command="git branch -a"
          description="Lista todas as branches, incluindo as branches remotas."
        />
        <CheatsheetCommand
          command="git branch <nome-da-branch>"
          description="Cria uma nova branch."
        />
        <CheatsheetCommand
          command="git checkout <nome-da-branch>"
          description="Muda para a branch especificada."
        />
        <CheatsheetCommand
          command="git checkout -b <nome-da-branch>"
          description="Cria e muda para uma nova branch em um único comando (forma clássica)."
        />
        <CheatsheetCommand
          command="git switch <nome-da-branch>"
          description="Sintaxe moderna e mais segura para mudar de branch."
        />
        <CheatsheetCommand
          command="git switch -c <nome-da-branch>"
          description="Cria e muda para a nova branch em um único comando."
        />
        <CheatsheetCommand
          command="git merge <nome-da-branch>"
          description="Incorpora as mudanças da branch especificada na branch atual."
        />
        <CheatsheetCommand
          command="git branch -d <nome-da-branch>"
          description="Deleta a branch especificada (apenas se já foi mergeada)."
        />
        <CheatsheetCommand
          command="git branch -D <nome-da-branch>"
          description="⚠️ Força a deleção de uma branch, mesmo que não tenha sido mergeada."
        />
      </CheatsheetCard>

      <CheatsheetCard title="Repositórios Remotos" icon={Terminal}>
        <CheatsheetCommand
          command="git remote -v"
          description="Lista os repositórios remotos configurados."
        />
        <CheatsheetCommand
          command="git remote add origin <url>"
          description="Adiciona um novo repositório remoto com o nome 'origin'."
        />
        <CheatsheetCommand
          command="git fetch origin"
          description="Busca todas as mudanças do repositório remoto, mas não as aplica."
        />
        <CheatsheetCommand
          command="git fetch --all --prune"
          description="Busca as mudanças de todos os remotos e remove o rastreamento de branches que foram deletadas no remoto."
        />
        <CheatsheetCommand
          command="git pull origin main"
          description="Busca as mudanças do remoto e as incorpora na branch atual. (git fetch + git merge)"
        />
        <CheatsheetCommand
          command="git push origin main"
          description="Envia os commits da sua branch local para o repositório remoto."
        />
        <CheatsheetCommand
          command="git push -u origin main"
          description="Envia a branch local para o remoto e define o rastreamento (upstream) para futuros `git pull/push`."
        />
      </CheatsheetCard>

      <CheatsheetCard title="Configurando Chave SSH para Autenticação" icon={Key}>
        <CheatsheetCommand
          command='ssh-keygen -t ed25519 -C "seu@email.com"'
          description="Cria um novo par de chaves SSH usando o algoritmo seguro Ed25519. Siga as instruções no terminal."
        />
        <CheatsheetCommand
          command="cat ~/.ssh/id_ed25519.pub"
          description="Exibe a chave pública. Copie o conteúdo e cole na seção 'SSH and GPG keys' do seu provedor Git (GitHub, GitLab, etc.)."
        />
      </CheatsheetCard>

      <CheatsheetCard title="Gerenciando Tags" icon={Tag}>
        <CheatsheetCommand
          command='git tag -a v1.0 -m "Versão 1.0"'
          description="Cria uma tag anotada, que é como uma versão imutável que inclui metadados como autor e data."
        />
        <CheatsheetCommand
          command="git push origin v1.0"
          description="Envia uma tag específica para o repositório remoto."
        />
        <CheatsheetCommand
          command="git push origin --tags"
          description="Envia todas as suas tags locais para o repositório remoto."
        />
      </CheatsheetCard>

      <CheatsheetCard title="Histórico e Diffs" icon={Terminal}>
        <CheatsheetCommand
          command="git log"
          description="Exibe o histórico de commits da branch atual."
        />
        <CheatsheetCommand
          command="git log --oneline --graph --decorate"
          description="Exibe o histórico de forma concisa, com gráfico de branches e nomes de branch/tag."
        />
        <CheatsheetCommand
          command="git show <commit>"
          description="Mostra as informações e as mudanças de um commit específico."
        />
        <CheatsheetCommand
          command="git diff"
          description="Mostra as diferenças entre o diretório de trabalho e a área de staging."
        />
        <CheatsheetCommand
          command="git diff --staged"
          description="Mostra as diferenças entre a área de staging e o último commit."
        />
        <CheatsheetCommand
          command="git diff HEAD"
          description="Mostra todas as mudanças desde o último commit (no working directory e no stage)."
        />
        <CheatsheetCommand
          command='git blame <arquivo> -L 10,20'
          description="Mostra quem alterou cada linha de um arquivo em um intervalo específico (linhas 10 a 20)."
        />
      </CheatsheetCard>

      <CheatsheetCard title="Desfazendo Mudanças" icon={Terminal}>
        <CheatsheetCommand
          command="git reset HEAD <arquivo>"
          description="Remove um arquivo da área de staging, mas mantém as mudanças no diretório de trabalho."
        />
        <CheatsheetCommand
          command="git reset <arquivo>"
          description="Forma abreviada de `git reset HEAD <arquivo>`, remove o arquivo do stage."
        />
        <CheatsheetCommand
          command="git reset --soft HEAD^"
          description="Desfaz o último commit, mas mantém as mudanças na área de staging (prontas para um novo commit)."
        />
        <CheatsheetCommand
          command="git reset --hard <commit>"
          description="⚠️ CUIDADO: Reseta o HEAD para um commit específico, descartando todas as mudanças posteriores."
        />
        <CheatsheetCommand
          command="git revert <commit>"
          description="Cria um novo commit que desfaz as mudanças de um commit anterior. É mais seguro que `reset` para histórico público."
        />
        <CheatsheetCommand
          command="git checkout -- <arquivo>"
          description="⚠️ CUIDADO: Descarta todas as mudanças em um arquivo no diretório de trabalho."
        />
        <CheatsheetCommand
          command="git clean -df"
          description="⚠️ CUIDADO: Remove todos os arquivos e diretórios não rastreados pelo Git."
        />
      </CheatsheetCard>

      <CheatsheetCard title="Salvando Mudanças Temporariamente" icon={Package}>
        <CheatsheetCommand
          command="git stash"
          description="Salva temporariamente as mudanças não commitadas para limpar o diretório de trabalho."
        />
        <CheatsheetCommand
          command='git stash push -m "Mensagem do stash"'
          description="Salva as mudanças não commitadas com uma mensagem descritiva."
        />
        <CheatsheetCommand
          command="git stash list"
          description="Lista todos os stashes salvos."
        />
        <CheatsheetCommand
          command="git stash apply"
          description="Aplica o último stash salvo sem removê-lo da lista."
        />
        <CheatsheetCommand
          command="git stash pop"
          description="Aplica as últimas mudanças salvas com `stash` e as remove da lista."
        />
      </CheatsheetCard>

      <CheatsheetCard title="Comandos Avançados" icon={Terminal}>
        <CheatsheetCommand
          command="git rebase -i HEAD~3"
          description="Inicia um rebase interativo dos 3 últimos commits. Permite editar, reordenar, agrupar (squash) ou remover commits."
          example={`# Para alterar a mensagem de um commit antigo:
# troque 'pick' por 'reword' no commit desejado.
# Salve, altere a mensagem e salve novamente.

# Editor interativo:
pick 1a2b3c4 feat: Adiciona nova funcionalidade
reword 5d6e7f8 fix: Corrige bug (MENSAGEM ANTIGA)
pick 9g8h1i2 chore: Atualiza dependências

# Comandos do rebase:
p, pick   = usar o commit
r, reword = usar o commit, mas editar a mensagem
e, edit   = usar o commit, mas parar para amendar
s, squash = usar o commit, mas fundir com o commit anterior
d, drop   = remover o commit`}
        />
        <CheatsheetCommand
          command="git cherry-pick <commit>"
          description="Aplica as mudanças de um commit específico de outra branch na branch atual."
        />
        <CheatsheetCommand
          command="git bisect start"
          description="Usa busca binária para encontrar o commit que introduziu um bug. Após iniciar, use `git bisect good` e `git bisect bad` para navegar."
        />
        <CheatsheetCommand
          command="git reflog"
          description="Exibe o log de todas as referências (HEAD, branches), útil para recuperar commits perdidos."
        />
      </CheatsheetCard>
    </CheatsheetDetail>
  );
}
