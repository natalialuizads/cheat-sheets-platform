"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Container, Shield, AlertTriangle, CheckCircle, XCircle, Terminal, FileText, Code, Network } from "lucide-react"

export function DockerSection() {
  const [activeTab, setActiveTab] = useState("basics")

  const dockerCommands = [
    {
      category: "Comandos Básicos",
      icon: Terminal,
      commands: [
        {
          command: "docker --version",
          description: "Verifica a versão do Docker instalada",
          example: "docker --version\n# Docker version 24.0.7, build afdd53b",
          security: "Sempre mantenha o Docker atualizado para correções de segurança",
        },
        {
          command: "docker pull <image>",
          description: "Baixa uma imagem do Docker Hub",
          example: "docker pull nginx:latest\ndocker pull node:18-alpine",
          security: "Use sempre tags específicas em produção, evite 'latest'",
        },
        {
          command: "docker run",
          description: "Executa um container a partir de uma imagem",
          example: "docker run -d -p 80:80 --name meu-nginx nginx\ndocker run -it ubuntu:20.04 /bin/bash",
          security: "Nunca execute containers como root em produção",
        },
        {
          command: "docker ps",
          description: "Lista containers em execução",
          example: "docker ps\ndocker ps -a  # inclui containers parados",
          security: "Monitore regularmente containers em execução",
        },
        {
          command: "docker inspect",
          description: "Exibe informações detalhadas sobre containers/imagens",
          example:
            "docker inspect meu-container\ndocker inspect --format='{{.NetworkSettings.IPAddress}}' meu-container",
          security: "Use inspect para verificar configurações de segurança",
        },
        {
          command: "docker stats",
          description: "Mostra estatísticas de uso de recursos em tempo real",
          example: "docker stats\ndocker stats --no-stream meu-container",
          security: "Monitore uso de recursos para detectar anomalias",
        },
        {
          command: "docker cp",
          description: "Copia arquivos entre container e host",
          example: "docker cp arquivo.txt meu-container:/app/\ndocker cp meu-container:/app/logs ./logs",
          security: "Evite copiar arquivos sensíveis desnecessariamente",
        },
      ],
    },
    {
      category: "Gerenciamento de Containers",
      icon: Container,
      commands: [
        {
          command: "docker stop/start",
          description: "Para ou inicia containers",
          example: "docker stop meu-container\ndocker start meu-container\ndocker restart meu-container",
          security: "Implemente graceful shutdown nos seus containers",
        },
        {
          command: "docker exec",
          description: "Executa comandos dentro de um container",
          example: "docker exec -it meu-container /bin/bash\ndocker exec meu-container ls -la",
          security: "Limite acesso exec apenas para usuários autorizados",
        },
        {
          command: "docker logs",
          description: "Visualiza logs de um container",
          example: "docker logs meu-container\ndocker logs -f --tail 100 meu-container",
          security: "Configure rotação de logs para evitar consumo excessivo de disco",
        },
        {
          command: "docker rm/rmi",
          description: "Remove containers e imagens",
          example: "docker rm meu-container\ndocker rmi nginx:latest\ndocker system prune -a",
          security: "Remova regularmente containers e imagens não utilizadas",
        },
        {
          command: "docker update",
          description: "Atualiza configurações de containers em execução",
          example: "docker update --memory=512m meu-container\ndocker update --cpus=1.5 meu-container",
          security: "Limite recursos para prevenir ataques de DoS",
        },
        {
          command: "docker rename",
          description: "Renomeia um container",
          example: "docker rename old-name new-name",
          security: "Use nomes descritivos para facilitar auditoria",
        },
        {
          command: "docker wait",
          description: "Aguarda um container terminar e retorna o exit code",
          example: "docker wait meu-container\n# Retorna: 0 (sucesso) ou código de erro",
          security: "Monitore exit codes para detectar falhas",
        },
      ],
    },
    {
      category: "Gerenciamento de Imagens",
      icon: FileText,
      commands: [
        {
          command: "docker build",
          description: "Constrói uma imagem a partir de um Dockerfile",
          example: "docker build -t minha-app:1.0 .\ndocker build --no-cache -t minha-app:latest .",
          security: "Use .dockerignore para evitar copiar arquivos sensíveis",
        },
        {
          command: "docker images",
          description: "Lista todas as imagens locais",
          example: "docker images\ndocker images --filter dangling=true",
          security: "Remova imagens não utilizadas regularmente",
        },
        {
          command: "docker tag",
          description: "Cria uma tag para uma imagem",
          example: "docker tag minha-app:latest registry.com/minha-app:v1.0",
          security: "Use tags semânticas para versionamento",
        },
        {
          command: "docker push/pull",
          description: "Envia/baixa imagens do registry",
          example: "docker push registry.com/minha-app:v1.0\ndocker pull registry.com/minha-app:v1.0",
          security: "Use registries privados para imagens proprietárias",
        },
        {
          command: "docker history",
          description: "Mostra o histórico de camadas de uma imagem",
          example: "docker history nginx:latest\ndocker history --no-trunc minha-app:1.0",
          security: "Analise camadas para identificar vulnerabilidades",
        },
        {
          command: "docker save/load",
          description: "Salva/carrega imagens como arquivos tar",
          example: "docker save -o minha-app.tar minha-app:latest\ndocker load -i minha-app.tar",
          security: "Criptografe arquivos tar ao transportar imagens",
        },
        {
          command: "docker export/import",
          description: "Exporta/importa containers como arquivos tar",
          example: "docker export meu-container > container.tar\ndocker import container.tar nova-imagem:tag",
          security: "Export não preserva histórico - use com cuidado",
        },
      ],
    },
    {
      category: "Redes e Volumes",
      icon: Network,
      commands: [
        {
          command: "docker network",
          description: "Gerencia redes Docker",
          example:
            "docker network create minha-rede\ndocker network ls\ndocker network inspect bridge\ndocker network rm minha-rede",
          security: "Use redes customizadas para isolar containers",
        },
        {
          command: "docker volume",
          description: "Gerencia volumes Docker",
          example:
            "docker volume create meu-volume\ndocker volume ls\ndocker volume inspect meu-volume\ndocker volume prune",
          security: "Criptografe volumes com dados sensíveis",
        },
        {
          command: "docker run --network",
          description: "Conecta container a uma rede específica",
          example: "docker run --network=minha-rede nginx\ndocker run --network=host nginx  # Usa rede do host",
          security: "Evite usar --network=host em produção",
        },
        {
          command: "docker run --volume",
          description: "Monta volumes em containers",
          example: "docker run -v meu-volume:/data nginx\ndocker run -v /host/path:/container/path nginx",
          security: "Use volumes nomeados em vez de bind mounts quando possível",
        },
      ],
    },
    {
      category: "Comandos Avançados",
      icon: Code,
      commands: [
        {
          command: "docker system",
          description: "Comandos de sistema e limpeza",
          example:
            "docker system df  # Uso de espaço\ndocker system prune -a  # Remove tudo não usado\ndocker system events  # Eventos em tempo real",
          security: "Execute limpeza regular para liberar espaço",
        },
        {
          command: "docker context",
          description: "Gerencia contextos Docker (local/remoto)",
          example:
            "docker context create remote --docker host=tcp://remote:2376\ndocker context use remote\ndocker context ls",
          security: "Use TLS para conexões remotas",
        },
        {
          command: "docker buildx",
          description: "Build avançado com suporte multi-plataforma",
          example: "docker buildx create --use\ndocker buildx build --platform linux/amd64,linux/arm64 -t app:latest .",
          security: "Construa para múltiplas arquiteturas com segurança",
        },
        {
          command: "docker scout",
          description: "Análise de vulnerabilidades (Docker Scout)",
          example: "docker scout cves minha-imagem:latest\ndocker scout recommendations minha-imagem:latest",
          security: "Escaneie todas as imagens antes do deploy",
        },
      ],
    },
  ]

  const securityBestPractices = [
    {
      practice: "Use imagens oficiais e verificadas",
      description: "Prefira imagens do Docker Official Images ou de publishers verificados",
      example: "# ✅ Bom\nFROM node:18-alpine\n\n# ❌ Evitar\nFROM random-user/node-custom",
    },
    {
      practice: "Não execute como root",
      description: "Crie um usuário não-privilegiado no Dockerfile",
      example: "# Dockerfile\nRUN addgroup -g 1001 -S nodejs\nRUN adduser -S nextjs -u 1001\nUSER nextjs",
    },
    {
      practice: "Use .dockerignore",
      description: "Evite copiar arquivos sensíveis para a imagem",
      example: "# .dockerignore\n.env\n.git\nnode_modules\n*.log\nsecrets/",
    },
    {
      practice: "Escaneie vulnerabilidades",
      description: "Use ferramentas como docker scan ou Trivy",
      example: "docker scan minha-imagem:latest\n# ou\ntrivy image minha-imagem:latest",
    },
    {
      practice: "Multi-stage builds",
      description: "Reduza o tamanho da imagem final",
      example:
        "FROM node:18 AS builder\n# build steps\nFROM node:18-alpine AS runtime\nCOPY --from=builder /app/dist ./dist",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Container className="h-10 w-10 text-blue-500" />
          Docker
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Guia completo de Docker com comandos essenciais, boas práticas de segurança e o que evitar
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basics">Comandos Básicos</TabsTrigger>
          <TabsTrigger value="advanced">Dockerfile Avançado</TabsTrigger>
          <TabsTrigger value="compose">Docker Compose</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="networks-volumes">Redes e Volumes</TabsTrigger>
          <TabsTrigger value="commands">Comandos Avançados</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-6">
          <div className="grid gap-6">
            {dockerCommands.map((section) => {
              const IconComponent = section.icon
              return (
                <Card key={section.category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5" />
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {section.commands.map((cmd, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono">
                            {cmd.command}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{cmd.description}</p>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium flex items-center gap-1">
                            <Code className="h-4 w-4" />
                            Exemplo:
                          </h4>
                          <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                            <code>{cmd.example}</code>
                          </pre>
                        </div>

                        <Alert>
                          <Shield className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            <strong>Segurança:</strong> {cmd.security}
                          </AlertDescription>
                        </Alert>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dockerfile Avançado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Multi-stage Build Completo:
                </h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                  <code>{`# Stage 1: Build dependencies
FROM node:18-alpine AS deps
WORKDIR /app
# Copy package files
COPY package*.json ./
# Install dependencies with exact versions
RUN npm ci --only=production --frozen-lockfile

# Stage 2: Build application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --frozen-lockfile
COPY . .
# Build application
RUN npm run build

# Stage 3: Runtime
FROM node:18-alpine AS runtime
# Create non-root user
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs package*.json ./

# Security: Remove package managers
RUN apk del npm

# Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/index.js"]`}</code>
                </pre>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Otimizações Avançadas:
                </h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                  <code>{`# Use cache mount para acelerar builds
FROM node:18-alpine AS builder
WORKDIR /app
# Cache npm dependencies
RUN --mount=type=cache,target=/root/.npm \\
    npm ci --frozen-lockfile

# Use bind mount para código fonte
RUN --mount=type=bind,source=package*.json,target=. \\
    --mount=type=cache,target=/root/.npm \\
    npm ci --frozen-lockfile

# Minimize layers
RUN apk add --no-cache git curl && \\
    npm install -g pm2 && \\
    apk del git

# Use .dockerignore efetivo
# .dockerignore:
# node_modules
# .git
# .env*
# *.log
# coverage/
# .nyc_output/`}</code>
                </pre>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-1">
                  <XCircle className="h-4 w-4 text-red-500" />
                  Anti-patterns Detalhados:
                </h4>
                <pre className="bg-red-50 border border-red-200 p-3 rounded text-sm overflow-x-auto">
                  <code>{`# ❌ NUNCA faça isso em produção

# 1. Usar latest em produção
FROM node:latest  # Use versões específicas: node:18.17.0-alpine

# 2. Executar como root
USER root  # Sempre crie e use usuário não-privilegiado

# 3. Instalar pacotes desnecessários
RUN apt-get update && apt-get install -y \\
    vim nano curl wget git  # Instale apenas o necessário

# 4. Não limpar cache
RUN apt-get update && apt-get install -y nodejs
# Sempre limpe: && rm -rf /var/lib/apt/lists/*

# 5. Copiar arquivos sensíveis
COPY . .  # Use .dockerignore para excluir .env, secrets/

# 6. Hardcode de secrets
ENV DATABASE_PASSWORD=123456  # Use Docker secrets ou env vars

# 7. Expor portas desnecessárias
EXPOSE 22 3306 5432  # Exponha apenas portas da aplicação

# 8. Não usar health checks
# Sempre adicione HEALTHCHECK para monitoramento`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Docker Compose Avançado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Compose Completo com Todas as Funcionalidades:</h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                  <code>{`version: '3.8'

services:
  # Frontend Application
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        NODE_ENV: production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - API_URL=http://backend:4000
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - frontend-network
    restart: unless-stopped
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Backend API
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://\${POSTGRES_USER}:\${POSTGRES_PASSWORD}@db:5432/\${POSTGRES_DB}
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET_FILE=/run/secrets/jwt_secret
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - frontend-network
      - backend-network
    volumes:
      - ./logs:/app/logs
      - uploads:/app/uploads
    secrets:
      - jwt_secret
      - db_password
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Database
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: \${POSTGRES_DB:-myapp}
      POSTGRES_USER: \${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - backend-network
    secrets:
      - db_password
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER:-postgres}"]
      interval: 10s
      timeout: 5s
      retries: 5
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M

  # Redis Cache
  redis:
    image: redis:7-alpine
    command: redis-server --requirepass \${REDIS_PASSWORD}
    environment:
      - REDIS_PASSWORD=\${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
      - ./redis.conf:/usr/local/etc/redis/redis.conf:ro
    networks:
      - backend-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - static_files:/var/www/static:ro
    depends_on:
      - frontend
      - backend
    networks:
      - frontend-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Monitoring
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    networks:
      - monitoring
    restart: unless-stopped

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD_FILE=/run/secrets/grafana_password
    volumes:
      - grafana_data:/var/lib/grafana
    secrets:
      - grafana_password
    networks:
      - monitoring
    restart: unless-stopped

# Volumes
volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  uploads:
    driver: local
  static_files:
    driver: local
  prometheus_data:
    driver: local
  grafana_data:
    driver: local

# Networks
networks:
  frontend-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
  backend-network:
    driver: bridge
    internal: true  # Rede interna, sem acesso à internet
  monitoring:
    driver: bridge

# Secrets
secrets:
  jwt_secret:
    file: ./secrets/jwt_secret.txt
  db_password:
    file: ./secrets/db_password.txt
  grafana_password:
    file: ./secrets/grafana_password.txt`}</code>
                </pre>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Comandos Docker Compose Essenciais:</h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                  <code>{`# Comandos básicos
docker-compose up -d                    # Inicia em background
docker-compose down                     # Para e remove containers
docker-compose down -v                  # Remove também volumes
docker-compose restart                  # Reinicia todos os serviços

# Build e deploy
docker-compose build                    # Reconstrói imagens
docker-compose up --build              # Reconstrói e inicia
docker-compose pull                     # Atualiza imagens

# Logs e monitoramento
docker-compose logs -f                  # Logs em tempo real
docker-compose logs -f backend          # Logs de serviço específico
docker-compose ps                       # Status dos serviços
docker-compose top                      # Processos em execução

# Execução de comandos
docker-compose exec backend bash        # Acessa container
docker-compose run --rm backend npm test # Executa comando único

# Scaling
docker-compose up --scale backend=3     # Escala serviço
docker-compose up --scale frontend=2 --scale backend=3

# Configuração
docker-compose config                   # Valida e mostra configuração
docker-compose config --services       # Lista serviços`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Boas Práticas de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {securityBestPractices.map((practice, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">{practice.practice}</h4>
                  <p className="text-sm text-muted-foreground">{practice.description}</p>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Exemplo:</h5>
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                      <code>{practice.example}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Vulnerabilidades Comuns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertDescription>
                  <strong>Containers Privilegiados:</strong> Evite executar containers com --privileged
                </AlertDescription>
              </Alert>

              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertDescription>
                  <strong>Secrets em Imagens:</strong> Nunca inclua senhas ou chaves em Dockerfiles
                </AlertDescription>
              </Alert>

              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertDescription>
                  <strong>Imagens Desatualizadas:</strong> Use sempre imagens atualizadas e escaneie vulnerabilidades
                </AlertDescription>
              </Alert>

              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertDescription>
                  <strong>Portas Desnecessárias:</strong> Exponha apenas as portas necessárias
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="networks-volumes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Redes e Volumes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dockerCommands
                .find((section) => section.category === "Redes e Volumes")
                .commands.map((cmd, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">
                        {cmd.command}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{cmd.description}</p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-1">
                        <Code className="h-4 w-4" />
                        Exemplo:
                      </h4>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                        <code>{cmd.example}</code>
                      </pre>
                    </div>

                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Segurança:</strong> {cmd.security}
                      </AlertDescription>
                    </Alert>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commands" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Comandos Avançados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dockerCommands
                .find((section) => section.category === "Comandos Avançados")
                .commands.map((cmd, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">
                        {cmd.command}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{cmd.description}</p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-1">
                        <Code className="h-4 w-4" />
                        Exemplo:
                      </h4>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                        <code>{cmd.example}</code>
                      </pre>
                    </div>

                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Segurança:</strong> {cmd.security}
                      </AlertDescription>
                    </Alert>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
