"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Database,
  Container,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Terminal,
  FileText,
  Settings,
  Lock,
  Code,
  GitBranch,
  Network,
} from "lucide-react"

export function DockerSQLSection() {
  const [activeTab, setActiveTab] = useState("docker-basics")
  const userId = 1 // Declare the userId variable here

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
      ],
    },
  ]

  const sqlCommands = [
    {
      category: "Comandos Básicos (DQL)",
      icon: Database,
      commands: [
        {
          command: "SELECT",
          description: "Consulta dados de uma ou mais tabelas",
          example:
            "SELECT * FROM usuarios;\nSELECT nome, email FROM usuarios WHERE ativo = 1;\nSELECT COUNT(*) FROM pedidos WHERE data_pedido >= '2024-01-01';",
          security: "Use LIMIT para evitar consultas que retornem muitos dados",
          antiPattern: "SELECT * FROM tabela_gigante; -- Evite SELECT * em tabelas grandes",
        },
        {
          command: "WHERE",
          description: "Filtra registros baseado em condições",
          example:
            "SELECT * FROM produtos WHERE preco > 100;\nSELECT * FROM usuarios WHERE nome LIKE 'João%' AND ativo = 1;",
          security: "Sempre use prepared statements para evitar SQL injection",
          antiPattern: `SELECT * FROM usuarios WHERE id = '${userId}'; -- SQL Injection!`, // Use template literals to avoid concatenation
        },
        {
          command: "ORDER BY",
          description: "Ordena resultados",
          example:
            "SELECT * FROM produtos ORDER BY preco DESC;\nSELECT * FROM usuarios ORDER BY nome ASC, data_cadastro DESC;",
          security: "Cuidado com ORDER BY em tabelas muito grandes sem índices",
          antiPattern: "ORDER BY RAND(); -- Muito lento em tabelas grandes",
        },
        {
          command: "GROUP BY",
          description: "Agrupa registros para funções de agregação",
          example:
            "SELECT categoria, COUNT(*) FROM produtos GROUP BY categoria;\nSELECT YEAR(data_pedido), SUM(valor) FROM pedidos GROUP BY YEAR(data_pedido);",
          security: "Use HAVING para filtrar grupos, não WHERE",
          antiPattern: "SELECT nome, COUNT(*) FROM usuarios; -- Sem GROUP BY",
        },
      ],
    },
    {
      category: "JOINs",
      icon: GitBranch,
      commands: [
        {
          command: "INNER JOIN",
          description: "Retorna registros que têm correspondência em ambas as tabelas",
          example: "SELECT u.nome, p.titulo\nFROM usuarios u\nINNER JOIN posts p ON u.id = p.usuario_id;",
          security: "Use índices nas colunas de JOIN para melhor performance",
          antiPattern: "JOIN sem ON clause ou com condições incorretas",
        },
        {
          command: "LEFT JOIN",
          description: "Retorna todos os registros da tabela esquerda",
          example:
            "SELECT u.nome, COUNT(p.id) as total_posts\nFROM usuarios u\nLEFT JOIN posts p ON u.id = p.usuario_id\nGROUP BY u.id;",
          security: "Cuidado com LEFT JOINs que podem retornar muitos NULLs",
          antiPattern: "LEFT JOIN desnecessário quando INNER JOIN seria suficiente",
        },
        {
          command: "RIGHT JOIN",
          description: "Retorna todos os registros da tabela direita",
          example: "SELECT p.titulo, u.nome\nFROM posts p\nRIGHT JOIN usuarios u ON p.usuario_id = u.id;",
          security: "RIGHT JOIN é menos comum, considere reescrever como LEFT JOIN",
          antiPattern: "Uso excessivo de RIGHT JOIN quando LEFT JOIN seria mais claro",
        },
      ],
    },
  ]

  const securityBestPractices = [
    {
      title: "Docker Security",
      icon: Shield,
      practices: [
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
      ],
    },
    {
      title: "SQL Security",
      icon: Lock,
      practices: [
        {
          practice: "Use Prepared Statements",
          description: "Sempre use prepared statements para evitar SQL injection",
          example:
            "// ✅ Seguro\nconst query = 'SELECT * FROM users WHERE id = ?';\ndb.query(query, [userId]);\n\n// ❌ Vulnerável\nconst query = `SELECT * FROM users WHERE id = ${userId}`;",
        },
        {
          practice: "Princípio do Menor Privilégio",
          description: "Conceda apenas as permissões mínimas necessárias",
          example:
            "-- Usuário apenas para leitura\nGRANT SELECT ON database.* TO 'readonly'@'%';\n\n-- Usuário específico para uma aplicação\nGRANT SELECT, INSERT, UPDATE ON app_db.* TO 'app_user'@'%';",
        },
        {
          practice: "Validação de Input",
          description: "Sempre valide e sanitize dados de entrada",
          example:
            "// Validação de email\nconst emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nif (!emailRegex.test(email)) {\n  throw new Error('Email inválido');\n}",
        },
        {
          practice: "Criptografia de Dados Sensíveis",
          description: "Criptografe senhas e dados sensíveis",
          example:
            "-- Nunca armazene senhas em texto plano\n-- Use bcrypt, scrypt ou similar\nINSERT INTO users (email, password_hash) \nVALUES ('user@email.com', '$2b$12$...');",
        },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Container className="h-10 w-10 text-blue-500" />
          <Database className="h-10 w-10 text-green-500" />
          Docker & SQL
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Guia completo de Docker e SQL com comandos essenciais, boas práticas de segurança e o que evitar
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="docker-basics">Docker Básico</TabsTrigger>
          <TabsTrigger value="docker-advanced">Docker Avançado</TabsTrigger>
          <TabsTrigger value="sql-basics">SQL Básico</TabsTrigger>
          <TabsTrigger value="sql-advanced">SQL Avançado</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="docker-basics" className="space-y-6">
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

        <TabsContent value="docker-advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dockerfile Avançado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Boas Práticas:
                </h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                  <code>{`# Multi-stage build para reduzir tamanho da imagem
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
WORKDIR /app
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]`}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-1">
                  <XCircle className="h-4 w-4 text-red-500" />
                  Anti-patterns:
                </h4>
                <pre className="bg-red-50 border border-red-200 p-3 rounded text-sm overflow-x-auto">
                  <code>{`# ❌ Não faça isso
FROM ubuntu:latest  # Use tags específicas
RUN apt-get update && apt-get install -y nodejs  # Instale apenas o necessário
COPY . .  # Copie tudo, incluindo arquivos desnecessários
USER root  # Nunca execute como root em produção
EXPOSE 22  # Não exponha SSH em containers`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Docker Compose
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                <code>{`version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
    networks:
      - app-network
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network
    secrets:
      - db_password

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge

secrets:
  db_password:
    file: ./secrets/db_password.txt`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sql-basics" className="space-y-6">
          <div className="grid gap-6">
            {sqlCommands.map((section) => {
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
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Exemplo:
                          </h4>
                          <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                            <code>{cmd.example}</code>
                          </pre>
                        </div>

                        {cmd.antiPattern && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium flex items-center gap-1">
                              <XCircle className="h-4 w-4 text-red-500" />
                              Anti-pattern:
                            </h4>
                            <pre className="bg-red-50 border border-red-200 p-3 rounded text-sm overflow-x-auto">
                              <code>{cmd.antiPattern}</code>
                            </pre>
                          </div>
                        )}

                        <Alert>
                          <Shield className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            <strong>Dica:</strong> {cmd.security}
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

        <TabsContent value="sql-advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Comandos DDL (Data Definition Language)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <Badge variant="outline" className="font-mono">
                    CREATE TABLE
                  </Badge>
                  <p className="text-sm text-muted-foreground">Cria uma nova tabela</p>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                    <code>{`CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_ativo (ativo)
);`}</code>
                  </pre>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <Badge variant="outline" className="font-mono">
                    ALTER TABLE
                  </Badge>
                  <p className="text-sm text-muted-foreground">Modifica estrutura de tabela existente</p>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                    <code>{`-- Adicionar coluna
ALTER TABLE usuarios ADD COLUMN telefone VARCHAR(20);

-- Modificar coluna
ALTER TABLE usuarios MODIFY COLUMN nome VARCHAR(150) NOT NULL;

-- Adicionar índice
ALTER TABLE usuarios ADD INDEX idx_telefone (telefone);

-- Adicionar chave estrangeira
ALTER TABLE pedidos 
ADD CONSTRAINT fk_usuario 
FOREIGN KEY (usuario_id) REFERENCES usuarios(id);`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Funções e Procedures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                <code>{`-- Stored Procedure
DELIMITER //
CREATE PROCEDURE GetUserOrders(IN user_id INT)
BEGIN
    SELECT 
        p.id,
        p.data_pedido,
        p.valor_total,
        p.status
    FROM pedidos p
    WHERE p.usuario_id = user_id
    ORDER BY p.data_pedido DESC;
END //
DELIMITER ;

-- Função
DELIMITER //
CREATE FUNCTION CalculateAge(birth_date DATE) 
RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN
    RETURN TIMESTAMPDIFF(YEAR, birth_date, CURDATE());
END //
DELIMITER ;

-- Uso
CALL GetUserOrders(123);
SELECT nome, CalculateAge(data_nascimento) as idade FROM usuarios;`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6">
            {securityBestPractices.map((section) => {
              const IconComponent = section.icon
              return (
                <Card key={section.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {section.practices.map((practice, index) => (
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
              )
            })}
          </div>

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
                  <strong>SQL Injection:</strong> Nunca concatene strings para formar queries SQL
                </AlertDescription>
              </Alert>

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
                  <strong>Permissões Excessivas:</strong> Siga o princípio do menor privilégio
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
