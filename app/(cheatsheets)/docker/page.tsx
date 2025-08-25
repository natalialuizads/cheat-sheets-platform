"use client";

import {
  Container,
  Terminal,
  Code,
  Network,
  FileText as DockerfileIcon,
} from "lucide-react";
import { CheatsheetDetail } from "@/components/cheatsheet/CheatsheetDetail";
import { CheatsheetCard } from "@/components/cheatsheet/CheatsheetCard";
import { CheatsheetCommand } from "@/components/cheatsheet/CheatsheetCommand";

export default function Docker() {
  return (
    <CheatsheetDetail
      title="Docker"
      description="Guia completo de Docker com comandos essenciais, boas práticas de segurança e o que evitar"
      icon={Container}
      iconColor="text-blue-600"
    >
      <CheatsheetCard title="Comandos Básicos" icon={Terminal}>
        <CheatsheetCommand
          command="docker --version"
          description="Verifica a versão do Docker instalada"
          example={"docker --version \n# Docker version 24.0.7, build afdd53b"}
          securityTip="Sempre mantenha o Docker atualizado para correções de segurança"
        />
        <CheatsheetCommand
          command="docker pull [image]"
          description="Baixa uma imagem do Docker Hub"
          example={"docker pull nginx:latest \ndocker pull node:18-alpine"} 
          securityTip="Use sempre tags específicas em produção, evite 'latest'"
        />
        <CheatsheetCommand
          command="docker run [options] [image]"
          description="Executa um container a partir de uma imagem"
          example={"docker run -d -p 80:80 --name meu-nginx nginx \ndocker run -it ubuntu:20.04 /bin/bash"} 
          securityTip="Nunca execute containers como root em produção"
        />
        <CheatsheetCommand
          command="docker ps [options]"
          description="Lista containers em execução"
          example={"docker ps \ndocker ps -a  # inclui containers parados"} 
          securityTip="Monitore regularmente containers em execução"
        />
        <CheatsheetCommand
          command="docker inspect [container/image]"
          description="Exibe informações detalhadas sobre containers/imagens"
          example={"docker inspect meu-container \ndocker inspect --format='{{.NetworkSettings.IPAddress}}' meu-container"} 
          securityTip="Use inspect para verificar configurações de segurança"
        />
        <CheatsheetCommand
          command="docker stats [containers]"
          description="Mostra estatísticas de uso de recursos em tempo real"
          example={"docker stats \ndocker stats --no-stream meu-container"} 
          securityTip="Monitore uso de recursos para detectar anomalias"
        />
        <CheatsheetCommand
          command="docker cp [src] [dest]"
          description="Copia arquivos entre container e host"
          example={"docker cp arquivo.txt meu-container:/app/\ndocker cp meu-container:/app/logs ./logs"} 
          securityTip="Evite copiar arquivos sensíveis desnecessariamente"
        />
      </CheatsheetCard>

      <CheatsheetCard title="Gerenciamento de Containers" icon={Container}>
        <CheatsheetCommand
          command="docker stop/start [container]"
          description="Para ou inicia containers"
          example={"docker stop meu-container \ndocker start meu-container\ndocker restart meu-container"} 
          securityTip="Implemente graceful shutdown nos seus containers"
        />
        <CheatsheetCommand
          command="docker exec [options] [container] [command]"
          description="Executa comandos dentro de um container"
          example={"docker exec -it meu-container /bin/bash\ndocker exec meu-container ls -la"} 
          securityTip="Limite acesso exec apenas para usuários autorizados"
        />
        <CheatsheetCommand
          command="docker logs [options] [container]"
          description="Visualiza logs de um container"
          example={"docker logs meu-container \ndocker logs -f --tail 100 meu-container"} 
          securityTip="Configure rotação de logs para evitar consumo excessivo de disco"
        />
        <CheatsheetCommand
          command="docker rm/rmi [container/image]"
          description="Remove containers e imagens"
          example={"docker rm meu-container \ndocker rmi nginx:latest\ndocker system prune -a"} 
          securityTip="Remova regularmente containers e imagens não utilizadas"
        />
        <CheatsheetCommand
          command="docker update [options] [container]"
          description="Atualiza configurações de containers em execução"
          example={"docker update --memory=512m meu-container \ndocker update --cpus=1.5 meu-container"} 
          securityTip="Limite recursos para prevenir ataques de DoS"
        />
      </CheatsheetCard>

      <CheatsheetCard title="Gerenciamento de Imagens" icon={DockerfileIcon}>
        <CheatsheetCommand
          command="docker build [options] [path]"
          description="Constrói uma imagem a partir de um Dockerfile"
          example={"docker build -t minha-app:1.0 . \ndocker build --no-cache -t minha-app:latest"} 
          securityTip="Use .dockerignore para evitar copiar arquivos sensíveis"
        />
        <CheatsheetCommand
          command="docker images [options]"
          description="Lista todas as imagens locais"
          example={"docker images \ndocker images --filter dangling=true"} 
          securityTip="Remova imagens não utilizadas regularmente"
        />
        <CheatsheetCommand
          command="docker tag [source] [target]"
          description="Cria uma tag para uma imagem"
          example={"docker tag minha-app:latest registry.com/minha-app:v1.0"} 
          securityTip="Use tags semânticas para versionamento"
        />
        <CheatsheetCommand
          command="docker push/pull [image]"
          description="Envia/baixa imagens do registry"
          example={"docker push registry.com/minha-app:v1.0 \ndocker pull registry.com/minha-app:v1.0"} 
          securityTip="Use registries privados para imagens proprietárias"
        />
        <CheatsheetCommand
          command="docker history [image]"
          description="Mostra o histórico de camadas de uma imagem"
          example={"docker history nginx:latest \ndocker history --no-trunc minha-app:1.0"} 
          securityTip="Analise camadas para identificar vulnerabilidades"
        />
      </CheatsheetCard>

      <CheatsheetCard title="Redes e Volumes" icon={Network}>
        <CheatsheetCommand
          command="docker network create [options] [network]"
          description="Cria e gerencia redes Docker"
          example={"docker network create minha-rede \ndocker network ls \ndocker network inspect bridge"} 
          securityTip="Use redes customizadas para isolar containers"
        />
        <CheatsheetCommand
          command="docker volume create [options] [volume]"
          description="Cria e gerencia volumes Docker"
          example={"docker volume create meu-volume \ndocker volume ls \ndocker volume inspect meu-volume"} 
          securityTip="Criptografe volumes com dados sensíveis"
        />
        <CheatsheetCommand
          command="docker run --network [network]"
          description="Conecta container a uma rede específica"
          example={"docker run --network=minha-rede nginx \ndocker run --network=host nginx"} 
          securityTip="Evite usar --network=host em produção"
        />
        <CheatsheetCommand
          command="docker run -v [volume]:[path]"
          description="Monta volumes em containers"
          example={"docker run -v meu-volume:/data nginx \ndocker run -v /host/path:/container/path nginx"} 
          securityTip="Use volumes nomeados em vez de bind mounts quando possível"
        />
      </CheatsheetCard>

      <CheatsheetCard title="Comandos Avançados" icon={Code}>
        <CheatsheetCommand
          command="docker system [command]"
          description="Comandos de sistema e limpeza"
          example={"docker system df \ndocker system prune -a \ndocker system events"} 
          securityTip="Execute limpeza regular para liberar espaço"
        />
        <CheatsheetCommand
          command="docker context [command]"
          description="Gerencia contextos Docker (local/remoto)"
          example={"docker context create remote --docker host=tcp://remote:2376 \ndocker context use remote"} 
          securityTip="Use TLS para conexões remotas"
        />
        <CheatsheetCommand
          command="docker buildx [command]"
          description="Build avançado com suporte multi-plataforma"
          example={"docker buildx create --use \ndocker buildx build --platform linux/amd64,linux/arm64 -t app:latest"} 
          securityTip="Construa para múltiplas arquiteturas com segurança"
        />
        <CheatsheetCommand
          command="docker scout [command]"
          description="Análise de vulnerabilidades (Docker Scout)"
          example={"docker scout cves minha-imagem:latest \ndocker scout recommendations minha-imagem:latest"} 
          securityTip="Escaneie todas as imagens antes do deploy"
        />
      </CheatsheetCard>
    </CheatsheetDetail>
  );
}
