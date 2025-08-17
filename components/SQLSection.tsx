"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, Shield, AlertTriangle, CheckCircle, XCircle, GitBranch, Settings, Lock, Code } from "lucide-react"

export function SQLSection() {
  const [activeTab, setActiveTab] = useState("basics")

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
          antiPattern: "SELECT * FROM usuarios WHERE id = '" + "' + userId + '" + "'; -- SQL Injection!",
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
        {
          command: "FULL OUTER JOIN",
          description: "Retorna todos os registros quando há correspondência em qualquer uma das tabelas",
          example: "SELECT u.nome, p.titulo\nFROM usuarios u\nFULL OUTER JOIN posts p ON u.id = p.usuario_id;",
          security: "Pode retornar muitos dados, use com cuidado",
          antiPattern: "FULL OUTER JOIN quando outros tipos de JOIN seriam mais eficientes",
        },
      ],
    },
  ]

  const ddlCommands = [
    {
      command: "CREATE TABLE",
      description: "Cria uma nova tabela",
      example: `CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_ativo (ativo)
);`,
      security: "Sempre defina constraints e índices apropriados",
    },
    {
      command: "ALTER TABLE",
      description: "Modifica estrutura de tabela existente",
      example: `-- Adicionar coluna
ALTER TABLE usuarios ADD COLUMN telefone VARCHAR(20);

-- Modificar coluna
ALTER TABLE usuarios MODIFY COLUMN nome VARCHAR(150) NOT NULL;

-- Adicionar índice
ALTER TABLE usuarios ADD INDEX idx_telefone (telefone);

-- Adicionar chave estrangeira
ALTER TABLE pedidos 
ADD CONSTRAINT fk_usuario 
FOREIGN KEY (usuario_id) REFERENCES usuarios(id);`,
      security: "Faça backup antes de alterações estruturais",
    },
    {
      command: "CREATE INDEX",
      description: "Cria índices para melhorar performance",
      example: `-- Índice simples
CREATE INDEX idx_usuario_email ON usuarios(email);

-- Índice composto
CREATE INDEX idx_pedido_data_status ON pedidos(data_pedido, status);

-- Índice único
CREATE UNIQUE INDEX idx_usuario_cpf ON usuarios(cpf);`,
      security: "Índices melhoram consultas mas podem impactar inserções",
    },
  ]

  const securityBestPractices = [
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
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Database className="h-10 w-10 text-green-500" />
          SQL
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Guia completo de SQL com comandos essenciais, boas práticas de segurança e o que evitar
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">SQL Básico</TabsTrigger>
          <TabsTrigger value="advanced">SQL Avançado</TabsTrigger>
          <TabsTrigger value="functions">Funções & Procedures</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-6">
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

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Comandos DDL (Data Definition Language)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ddlCommands.map((cmd, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <Badge variant="outline" className="font-mono">
                    {cmd.command}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{cmd.description}</p>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                    <code>{cmd.example}</code>
                  </pre>
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
        </TabsContent>

        <TabsContent value="functions" className="space-y-6">
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Funções de Agregação e Window Functions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                <code>{`-- Funções de Agregação
SELECT 
    categoria,
    COUNT(*) as total_produtos,
    AVG(preco) as preco_medio,
    MIN(preco) as menor_preco,
    MAX(preco) as maior_preco,
    SUM(estoque) as estoque_total
FROM produtos 
GROUP BY categoria;

-- Window Functions
SELECT 
    nome,
    salario,
    departamento,
    ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC) as ranking,
    LAG(salario) OVER (PARTITION BY departamento ORDER BY salario) as salario_anterior,
    AVG(salario) OVER (PARTITION BY departamento) as media_departamento
FROM funcionarios;`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
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
                  <strong>SQL Injection:</strong> Nunca concatene strings para formar queries SQL
                </AlertDescription>
              </Alert>

              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertDescription>
                  <strong>Permissões Excessivas:</strong> Siga o princípio do menor privilégio
                </AlertDescription>
              </Alert>

              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertDescription>
                  <strong>Dados Não Criptografados:</strong> Criptografe dados sensíveis no banco
                </AlertDescription>
              </Alert>

              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertDescription>
                  <strong>Backup Inseguro:</strong> Proteja backups com criptografia
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
