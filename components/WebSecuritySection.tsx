"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Shield, AlertTriangle, CheckCircle, Server, Globe, Database, Key, Bug } from "lucide-react"

interface CodeExampleProps {
  code: string
  language: string
}

function CodeExample({ code, language }: CodeExampleProps) {
  return (
    <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export function WebSecuritySection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const securityTopics = {
    "Browser Security": {
      icon: Globe,
      color: "text-blue-600",
      topics: [
        {
          name: "The parts of a browser",
          description: "Componentes do navegador e suas implicações de segurança",
          example: `// ✅ Entendendo componentes do browser
// 1. Rendering Engine (Blink, WebKit, Gecko)
// 2. JavaScript Engine (V8, SpiderMonkey)
// 3. Network Stack
// 4. Storage (LocalStorage, SessionStorage, IndexedDB)

// Isolamento entre origens
if (window.location.origin !== 'https://trusted-site.com') {
  // Bloquear operações sensíveis
  throw new Error('Origem não confiável');
}

// ❌ Ignorar Same-Origin Policy
// Nunca desabilite CORS sem entender as implicações
fetch('https://api.externa.com/data', {
  mode: 'no-cors' // PERIGOSO!
});`,
          goodPractice: "Entenda como o navegador isola diferentes origens e contextos",
          avoid: "Desabilitar proteções do navegador sem compreender os riscos",
        },
        {
          name: "The JavaScript sandbox",
          description: "Sandbox do JavaScript e suas limitações de segurança",
          example: `// ✅ Respeitando o sandbox
// JavaScript não pode acessar sistema de arquivos diretamente
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.onchange = (e) => {
  const file = e.target.files[0];
  // Processar arquivo com segurança
};

// Validação no cliente E servidor
function validateInput(data) {
  // Validação básica no cliente
  if (!data || data.length > 1000) {
    return false;
  }
  // SEMPRE validar no servidor também
  return true;
}

// ❌ Confiar apenas no cliente
// Nunca confie apenas em validações JavaScript
function unsafeValidation(password) {
  return password === 'admin123'; // Visível no código fonte!
}`,
          goodPractice: "Use o sandbox como primeira linha de defesa, mas sempre valide no servidor",
          avoid: "Confiar apenas em validações do lado cliente para segurança",
        },
      ],
    },
    Encryption: {
      icon: Key,
      color: "text-green-600",
      topics: [
        {
          name: "The principles of encryption",
          description: "Princípios fundamentais de criptografia",
          example: `// ✅ Usando Web Crypto API
async function encryptData(data, key) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: crypto.getRandomValues(new Uint8Array(12))
    },
    key,
    dataBuffer
  );
  
  return encrypted;
}

// Gerar chave segura
async function generateKey() {
  return await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256
    },
    true,
    ['encrypt', 'decrypt']
  );
}

// ❌ Criptografia caseira
function badEncryption(text) {
  return btoa(text); // Base64 NÃO é criptografia!
}`,
          goodPractice: "Use bibliotecas criptográficas estabelecidas e algoritmos aprovados",
          avoid: "Implementar criptografia própria ou usar codificação como criptografia",
        },
        {
          name: "Encryption in transit",
          description: "Criptografia em trânsito - HTTPS e TLS",
          example: `// ✅ Forçar HTTPS
// No servidor (Express.js)
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(\`https://\${req.header('host')}\${req.url}\`);
  } else {
    next();
  }
});

// Headers de segurança
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// ❌ Dados sensíveis em HTTP
fetch('http://api.insegura.com/login', {
  method: 'POST',
  body: JSON.stringify({ password: 'senha123' }) // Visível na rede!
});`,
          goodPractice: "Sempre use HTTPS para dados sensíveis e implemente HSTS",
          avoid: "Transmitir dados sensíveis por HTTP ou conexões não criptografadas",
        },
      ],
    },
    "Web Server Security": {
      icon: Server,
      color: "text-purple-600",
      topics: [
        {
          name: "Validating input",
          description: "Validação e sanitização de entrada",
          example: `// ✅ Validação robusta
const validator = require('validator');

function validateUserInput(input) {
  // Sanitizar
  const sanitized = validator.escape(input.trim());
  
  // Validar comprimento
  if (sanitized.length < 1 || sanitized.length > 255) {
    throw new Error('Comprimento inválido');
  }
  
  // Validar formato
  if (!validator.isAlphanumeric(sanitized, 'pt-BR')) {
    throw new Error('Caracteres inválidos');
  }
  
  return sanitized;
}

// Validação de email
function validateEmail(email) {
  if (!validator.isEmail(email)) {
    throw new Error('Email inválido');
  }
  return validator.normalizeEmail(email);
}

// ❌ Entrada não validada
app.post('/user', (req, res) => {
  const query = \`INSERT INTO users (name) VALUES ('\${req.body.name}')\`;
  // SQL Injection vulnerability!
  db.query(query);
});`,
          goodPractice: "Sempre valide, sanitize e escape dados de entrada",
          avoid: "Usar dados de entrada diretamente em queries ou comandos",
        },
        {
          name: "Escaping output",
          description: "Escape de saída para prevenir XSS",
          example: `// ✅ Escape adequado
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Template engine com escape automático
app.set('view engine', 'ejs');
// EJS escapa automaticamente com <%- %>

// React escapa automaticamente
function UserProfile({ userName }) {
  return <h1>Olá, {userName}</h1>; // Escapado automaticamente
}

// ❌ Saída não escapada
app.get('/profile', (req, res) => {
  const html = \`<h1>Olá, \${req.query.name}</h1>\`; // XSS vulnerability!
  res.send(html);
});`,
          goodPractice: "Use templates que escapam automaticamente ou escape manualmente",
          avoid: "Inserir dados de usuário diretamente em HTML sem escape",
        },
      ],
    },
    "Browser Vulnerabilities": {
      icon: Bug,
      color: "text-red-600",
      topics: [
        {
          name: "Cross-site scripting",
          description: "Prevenção de ataques XSS",
          example: `// ✅ Prevenção XSS
// Content Security Policy
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
  next();
});

// Sanitização com DOMPurify
import DOMPurify from 'dompurify';

function renderUserContent(htmlContent) {
  const clean = DOMPurify.sanitize(htmlContent);
  return { __html: clean };
}

// Validação de entrada
function validateComment(comment) {
  if (/<script|javascript:|on\w+=/i.test(comment)) {
    throw new Error('Conteúdo suspeito detectado');
  }
  return comment;
}

// ❌ XSS vulnerável
function displayComment(comment) {
  document.getElementById('comments').innerHTML += 
    \`<div>\${comment}</div>\`; // XSS!
}`,
          goodPractice: "Use CSP, sanitize HTML e escape dados de usuário",
          avoid: "innerHTML com dados não confiáveis e scripts inline",
        },
        {
          name: "Cross-site request forgery",
          description: "Proteção contra ataques CSRF",
          example: `// ✅ Proteção CSRF
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

// No template
// <input type="hidden" name="_csrf" value="<%= csrfToken %>">

// Verificar origem
app.use((req, res, next) => {
  const origin = req.get('Origin');
  const referer = req.get('Referer');
  
  if (req.method !== 'GET' && !isValidOrigin(origin, referer)) {
    return res.status(403).send('Origem inválida');
  }
  next();
});

// ❌ Sem proteção CSRF
app.post('/transfer', (req, res) => {
  // Qualquer site pode fazer esta requisição!
  transferMoney(req.body.amount, req.body.to);
});`,
          goodPractice: "Use tokens CSRF e verifique origem das requisições",
          avoid: "Operações sensíveis sem verificação de origem ou token",
        },
      ],
    },
    "Authentication Vulnerabilities": {
      icon: Shield,
      color: "text-orange-600",
      topics: [
        {
          name: "Brute-force attacks",
          description: "Proteção contra ataques de força bruta",
          example: `// ✅ Proteção contra brute force
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas
  message: 'Muitas tentativas de login',
  standardHeaders: true,
  legacyHeaders: false,
});

// Slow down
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 2,
  delayMs: 500
});

app.post('/login', loginLimiter, speedLimiter, async (req, res) => {
  // Implementar delay progressivo
  const attempts = await getFailedAttempts(req.ip);
  if (attempts > 3) {
    await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
  }
  
  // Verificar credenciais
});

// ❌ Sem proteção
app.post('/login', (req, res) => {
  // Permite tentativas ilimitadas!
  if (checkPassword(req.body.password)) {
    res.json({ success: true });
  }
});`,
          goodPractice: "Implemente rate limiting, delays progressivos e bloqueio temporário",
          avoid: "Permitir tentativas ilimitadas de login",
        },
        {
          name: "Multifactor authentication",
          description: "Implementação de autenticação multifator",
          example: `// ✅ MFA com TOTP
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

// Gerar secret para usuário
function generateMFASecret(userId) {
  const secret = speakeasy.generateSecret({
    name: \`MyApp (\${userId})\`,
    issuer: 'MyApp'
  });
  
  return {
    secret: secret.base32,
    qrCode: qrcode.toDataURL(secret.otpauth_url)
  };
}

// Verificar token MFA
function verifyMFAToken(token, secret) {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window: 2 // Permite 2 períodos de tolerância
  });
}

// Middleware MFA
function requireMFA(req, res, next) {
  if (!req.session.mfaVerified) {
    return res.status(401).json({ error: 'MFA required' });
  }
  next();
}

// ❌ Apenas senha
app.post('/sensitive-action', (req, res) => {
  // Apenas verificação de senha não é suficiente
  if (req.session.authenticated) {
    performSensitiveAction();
  }
});`,
          goodPractice: "Implemente MFA para contas sensíveis usando TOTP ou SMS",
          avoid: "Confiar apenas em senhas para operações críticas",
        },
      ],
    },
    "Injection Vulnerabilities": {
      icon: Database,
      color: "text-indigo-600",
      topics: [
        {
          name: "SQL injection",
          description: "Prevenção de injeção SQL",
          example: `// ✅ Prepared statements
const mysql = require('mysql2/promise');

async function getUserById(id) {
  const connection = await mysql.createConnection(config);
  
  // Prepared statement - seguro
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  
  return rows[0];
}

// ORM com proteção
const { User } = require('./models');

async function findUser(email) {
  // Sequelize escapa automaticamente
  return await User.findOne({
    where: { email: email }
  });
}

// ❌ SQL injection vulnerável
async function unsafeGetUser(id) {
  const query = \`SELECT * FROM users WHERE id = \${id}\`;
  // Se id = "1 OR 1=1", retorna todos os usuários!
  return await db.query(query);
}`,
          goodPractice: "Use prepared statements, ORMs ou query builders",
          avoid: "Concatenar strings para formar queries SQL",
        },
        {
          name: "Command injection",
          description: "Prevenção de injeção de comandos",
          example: `// ✅ Execução segura de comandos
const { spawn } = require('child_process');
const path = require('path');

function safeExecute(filename) {
  // Validar entrada
  if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
    throw new Error('Nome de arquivo inválido');
  }
  
  // Usar spawn com array de argumentos
  const child = spawn('ls', ['-la', path.join('/safe/directory', filename)]);
  
  return new Promise((resolve, reject) => {
    let output = '';
    child.stdout.on('data', (data) => output += data);
    child.on('close', (code) => {
      if (code === 0) resolve(output);
      else reject(new Error('Comando falhou'));
    });
  });
}

// ❌ Command injection vulnerável
const { exec } = require('child_process');

function unsafeExecute(filename) {
  // Se filename = "file.txt; rm -rf /", executa comando perigoso!
  exec(\`ls -la \${filename}\`, (error, stdout) => {
    console.log(stdout);
  });
}`,
          goodPractice: "Use spawn com arrays de argumentos e valide entradas",
          avoid: "Usar exec ou system com strings concatenadas",
        },
      ],
    },
  }

  const filteredTopics = selectedCategory
    ? { [selectedCategory]: securityTopics[selectedCategory as keyof typeof securityTopics] }
    : securityTopics

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
          <Lock className="h-10 w-10" />
          Web Application Security
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Guia completo de segurança para aplicações web com vulnerabilidades, ataques e práticas de proteção
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <Button variant={selectedCategory === null ? "default" : "outline"} onClick={() => setSelectedCategory(null)}>
          Todas as Categorias
        </Button>
        {Object.entries(securityTopics).map(([category, data]) => {
          const Icon = data.icon
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-2"
            >
              <Icon className={`h-4 w-4 ${data.color}`} />
              {category}
            </Button>
          )
        })}
      </div>

      <div className="space-y-8">
        {Object.entries(filteredTopics).map(([category, data]) => {
          const Icon = data.icon
          return (
            <section key={category}>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Icon className={`h-8 w-8 ${data.color}`} />
                {category}
              </h2>

              <div className="grid gap-6">
                {data.topics.map((topic) => (
                  <Card key={topic.name} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">{topic.name}</CardTitle>
                      <CardDescription className="text-base">{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">Exemplo de Implementação:</h4>
                        <CodeExample code={topic.example} language="javascript" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong className="text-green-700">✅ Boa Prática:</strong>
                            <p className="text-sm mt-1">{topic.goodPractice}</p>
                          </AlertDescription>
                        </Alert>

                        <Alert variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <strong className="text-red-700">❌ Evite:</strong>
                            <p className="text-sm mt-1">{topic.avoid}</p>
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <Tabs defaultValue="owasp" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="owasp">OWASP Top 10</TabsTrigger>
          <TabsTrigger value="headers">Security Headers</TabsTrigger>
          <TabsTrigger value="tools">Ferramentas</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="owasp">
          <Card>
            <CardHeader>
              <CardTitle>OWASP Top 10 - 2025</CardTitle>
              <CardDescription>As 10 vulnerabilidades mais críticas em aplicações web para 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    rank: "A01",
                    name: "Broken Access Control",
                    risk: "Alto",
                    description: "Falhas no controle de acesso permitem que usuários acessem recursos não autorizados",
                  },
                  {
                    rank: "A02",
                    name: "Cryptographic Failures in AI Era",
                    risk: "Alto",
                    description: "Falhas criptográficas especialmente críticas em sistemas de IA e ML",
                  },
                  {
                    rank: "A03",
                    name: "Injection Attacks in Hyper-Connected Environments",
                    risk: "Alto",
                    description: "Ataques de injeção em ambientes altamente conectados e distribuídos",
                  },
                  {
                    rank: "A04",
                    name: "Insecure Design",
                    risk: "Alto",
                    description: "Falhas de design de segurança desde a concepção da aplicação",
                  },
                  {
                    rank: "A05",
                    name: "Security Misconfiguration",
                    risk: "Médio",
                    description: "Configurações de segurança inadequadas ou padrões inseguros",
                  },
                  {
                    rank: "A06",
                    name: "Vulnerable and Outdated Components",
                    risk: "Alto",
                    description: "Uso de componentes com vulnerabilidades conhecidas ou desatualizados",
                  },
                  {
                    rank: "A07",
                    name: "Identification and Authentication Failures",
                    risk: "Alto",
                    description: "Falhas na identificação e autenticação de usuários",
                  },
                  {
                    rank: "A08",
                    name: "Software and Data Integrity Failures",
                    risk: "Médio",
                    description: "Falhas na integridade de software e dados, incluindo supply chain attacks",
                  },
                  {
                    rank: "A09",
                    name: "Security Logging and Monitoring Failures",
                    risk: "Médio",
                    description: "Falhas no logging e monitoramento de eventos de segurança",
                  },
                  {
                    rank: "A10",
                    name: "Server-Side Request Forgery (SSRF)",
                    risk: "Médio",
                    description: "Ataques que exploram requisições do servidor para recursos internos",
                  },
                ].map((item) => (
                  <div key={item.rank} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono">
                          {item.rank}
                        </Badge>
                        <span className="font-medium text-lg">{item.name}</span>
                      </div>
                      <Badge
                        variant={item.risk === "Alto" ? "destructive" : item.risk === "Médio" ? "default" : "secondary"}
                      >
                        {item.risk}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground ml-16">{item.description}</p>
                  </div>
                ))}
              </div>

              <Alert className="mt-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Novidades em 2025:</strong> O OWASP Top 10 2025 enfatiza vulnerabilidades em contextos de IA,
                  ambientes hiperconectados e falhas de integridade em supply chains. Especial atenção para criptografia
                  em sistemas de machine learning e ataques de injeção em arquiteturas distribuídas.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="headers">
          <Card>
            <CardHeader>
              <CardTitle>Security Headers Essenciais</CardTitle>
              <CardDescription>Headers HTTP que melhoram a segurança da aplicação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded">
                    <h5 className="font-medium mb-2">Content-Security-Policy</h5>
                    <p className="text-sm text-muted-foreground mb-2">Previne XSS controlando recursos</p>
                    <CodeExample
                      code={`Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'`}
                      language="http"
                    />
                  </div>

                  <div className="p-4 border rounded">
                    <h5 className="font-medium mb-2">Strict-Transport-Security</h5>
                    <p className="text-sm text-muted-foreground mb-2">Força uso de HTTPS</p>
                    <CodeExample
                      code={`Strict-Transport-Security: max-age=31536000; includeSubDomains`}
                      language="http"
                    />
                  </div>

                  <div className="p-4 border rounded">
                    <h5 className="font-medium mb-2">X-Frame-Options</h5>
                    <p className="text-sm text-muted-foreground mb-2">Previne clickjacking</p>
                    <CodeExample code={`X-Frame-Options: DENY`} language="http" />
                  </div>

                  <div className="p-4 border rounded">
                    <h5 className="font-medium mb-2">X-Content-Type-Options</h5>
                    <p className="text-sm text-muted-foreground mb-2">Previne MIME sniffing</p>
                    <CodeExample code={`X-Content-Type-Options: nosniff`} language="http" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <CardTitle>Ferramentas de Segurança</CardTitle>
              <CardDescription>Ferramentas para testar e melhorar a segurança</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-blue-700">Análise Estática</h4>
                  <ul className="text-sm space-y-2">
                    <li>• ESLint Security Plugin</li>
                    <li>• Semgrep</li>
                    <li>• SonarQube</li>
                    <li>• Bandit (Python)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-green-700">Testes Dinâmicos</h4>
                  <ul className="text-sm space-y-2">
                    <li>• OWASP ZAP</li>
                    <li>• Burp Suite</li>
                    <li>• Nikto</li>
                    <li>• SQLMap</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-purple-700">Monitoramento</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Security Headers</li>
                    <li>• Mozilla Observatory</li>
                    <li>• Qualys SSL Test</li>
                    <li>• Snyk</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist">
          <Card>
            <CardHeader>
              <CardTitle>Security Checklist</CardTitle>
              <CardDescription>Lista de verificação para aplicações seguras</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Autenticação & Autorização</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Senhas são hasheadas com salt
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      MFA implementado para contas sensíveis
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Rate limiting em endpoints de login
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Controle de acesso baseado em roles
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Entrada & Saída</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Validação de entrada no servidor
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Escape de saída para prevenir XSS
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Prepared statements para SQL
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      CSP implementado
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
