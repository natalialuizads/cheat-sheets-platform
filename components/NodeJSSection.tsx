"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Server,
  Code2,
  Globe,
  Database,
  TestTube,
  Zap,
  Shield,
  Settings,
  CheckCircle,
  XCircle,
  Copy,
  FileText,
} from "lucide-react";

export function NodeJSSection() {
  const [activeTab, setActiveTab] = useState("fundamentals");

  const fundamentalsContent = {
    architecture: {
      title: "Arquitetura e Event Loop",
      items: [
        {
          concept: "Event Loop - Como Funciona",
          description:
            "O Event Loop é o coração do Node.js. Ele permite operações não-bloqueantes através de um modelo de concorrência baseado em eventos. Entender seu funcionamento é crucial para escrever código Node.js eficiente.",
          explanation:
            "O Event Loop processa callbacks em diferentes fases: Timer, Pending callbacks, Poll, Check, e Close callbacks. Cada fase tem uma fila específica de callbacks para executar.",
          example: `// Demonstração das fases do Event Loop
console.log('=== INÍCIO ===');

// 1. Call Stack (execução imediata)
console.log('1. Call Stack - Síncrono');

// 2. Timer Phase (setTimeout, setInterval)
setTimeout(() => console.log('4. Timer Phase - setTimeout 0ms'), 0);
setTimeout(() => console.log('5. Timer Phase - setTimeout 1ms'), 1);

// 3. Check Phase (setImmediate)
setImmediate(() => console.log('6. Check Phase - setImmediate'));

// 4. Next Tick Queue (maior prioridade)
process.nextTick(() => console.log('2. Next Tick Queue - Prioridade máxima'));

// 5. Microtask Queue (Promises)
Promise.resolve().then(() => console.log('3. Microtask Queue - Promise'));

// 6. I/O Operations (Poll Phase)
require('fs').readFile(__filename, () => {
  console.log('7. Poll Phase - I/O callback');
  
  // Dentro de I/O callback
  setTimeout(() => console.log('9. Timer dentro de I/O'), 0);
  setImmediate(() => console.log('8. setImmediate dentro de I/O'));
});

console.log('=== FIM SÍNCRONO ===');

// Output esperado:
// === INÍCIO ===
// 1. Call Stack - Síncrono  
// === FIM SÍNCRONO ===
// 2. Next Tick Queue - Prioridade máxima
// 3. Microtask Queue - Promise
// 4. Timer Phase - setTimeout 0ms
// 5. Timer Phase - setTimeout 1ms
// 6. Check Phase - setImmediate
// 7. Poll Phase - I/O callback
// 8. setImmediate dentro de I/O
// 9. Timer dentro de I/O`,
          goodPractice:
            "Use process.nextTick() apenas quando necessário e prefira setImmediate() para agendar callbacks",
          antiPattern:
            "Nunca bloqueie o Event Loop com operações síncronas pesadas como loops infinitos ou cálculos intensivos",
        },
        {
          concept: "Streams - Processamento Eficiente de Dados",
          description:
            "Streams permitem processar dados em pedaços (chunks) ao invés de carregar tudo na memória. São fundamentais para aplicações que lidam com grandes volumes de dados.",
          explanation:
            "Existem 4 tipos de streams: Readable (leitura), Writable (escrita), Duplex (leitura e escrita), e Transform (modifica dados durante a passagem).",
          example: `const fs = require('fs');
const { Transform, pipeline } = require('stream');
const zlib = require('zlib');

// 1. Readable Stream personalizado
const { Readable } = require('stream');

class NumberStream extends Readable {
  constructor(max) {
    super({ objectMode: true });
    this.current = 0;
    this.max = max;
  }
  
  _read() {
    if (this.current < this.max) {
      this.push({ number: this.current++ });
    } else {
      this.push(null); // Fim do stream
    }
  }
}

// 2. Transform Stream personalizado
class SquareTransform extends Transform {
  constructor() {
    super({ objectMode: true });
  }
  
  _transform(chunk, encoding, callback) {
    const squared = { 
      original: chunk.number, 
      squared: chunk.number ** 2 
    };
    callback(null, squared);
  }
}

// 3. Writable Stream personalizado
const { Writable } = require('stream');

class LoggerStream extends Writable {
  constructor() {
    super({ objectMode: true });
  }
  
  _write(chunk, encoding, callback) {
    console.log(\`Número: \${chunk.original}, Quadrado: \${chunk.squared}\`);
    callback();
  }
}

// 4. Usando pipeline para conectar streams
const numberStream = new NumberStream(5);
const squareTransform = new SquareTransform();
const loggerStream = new LoggerStream();

pipeline(
  numberStream,
  squareTransform,
  loggerStream,
  (err) => {
    if (err) {
      console.error('Pipeline falhou:', err);
    } else {
      console.log('Pipeline concluído com sucesso');
    }
  }
);

// 5. Stream de arquivo com compressão
const readStream = fs.createReadStream('input.txt');
const gzipStream = zlib.createGzip();
const writeStream = fs.createWriteStream('output.txt.gz');

pipeline(readStream, gzipStream, writeStream, (err) => {
  if (err) {
    console.error('Erro na compressão:', err);
  } else {
    console.log('Arquivo comprimido com sucesso');
  }
});`,
          goodPractice: "Use pipeline() para conectar streams com tratamento automático de erros e cleanup",
          antiPattern: "Não use .pipe() sem tratamento de erro adequado, prefira pipeline()",
        },
        {
          concept: "Buffer e Manipulação de Dados Binários",
          description:
            "Buffers são usados para manipular dados binários brutos. São essenciais para trabalhar com arquivos, rede e criptografia.",
          explanation:
            "Buffers representam sequências de bytes na memória. Diferente de strings, eles podem conter qualquer tipo de dado binário e têm tamanho fixo.",
          example: `// 1. Criando Buffers
const buf1 = Buffer.alloc(10); // Buffer zerado de 10 bytes
const buf2 = Buffer.allocUnsafe(10); // Buffer não inicializado (mais rápido)
const buf3 = Buffer.from('Hello World', 'utf8');
const buf4 = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // Array de bytes

console.log('Buffer from string:', buf3);
console.log('Buffer as string:', buf3.toString());
console.log('Buffer length:', buf3.length);

// 2. Manipulação de Buffers
const buffer = Buffer.alloc(8);

// Escrever diferentes tipos de dados
buffer.writeUInt32BE(0x12345678, 0); // Big Endian
buffer.writeUInt32LE(0x12345678, 4); // Little Endian

console.log('Buffer hex:', buffer.toString('hex'));

// Ler dados do buffer
const bigEndian = buffer.readUInt32BE(0);
const littleEndian = buffer.readUInt32LE(4);

console.log('Big Endian:', bigEndian.toString(16));
console.log('Little Endian:', littleEndian.toString(16));

// 3. Concatenação de Buffers
const buf5 = Buffer.from('Hello ');
const buf6 = Buffer.from('World!');
const concatenated = Buffer.concat([buf5, buf6]);

console.log('Concatenated:', concatenated.toString());

// 4. Comparação de Buffers
const bufA = Buffer.from('ABC');
const bufB = Buffer.from('ABC');
const bufC = Buffer.from('BCD');

console.log('bufA equals bufB:', bufA.equals(bufB)); // true
console.log('bufA compare bufC:', bufA.compare(bufC)); // -1 (menor)

// 5. Trabalhando com JSON
const data = { name: 'John', age: 30 };
const jsonBuffer = Buffer.from(JSON.stringify(data));
const parsedData = JSON.parse(jsonBuffer.toString());

console.log('Original:', data);
console.log('From Buffer:', parsedData);`,
          goodPractice:
            "Use Buffer.alloc() para buffers seguros e Buffer.allocUnsafe() apenas quando performance é crítica",
          antiPattern: "Não converta buffers grandes para string desnecessariamente - processe em chunks",
        },
        {
          concept: "Child Processes - Executando Comandos Externos",
          description:
            "Child processes permitem executar comandos do sistema operacional e outros programas a partir do Node.js.",
          explanation:
            "Existem 4 métodos principais: spawn() (stream), exec() (buffer), execFile() (arquivo específico), e fork() (processos Node.js).",
          example: `const { spawn, exec, execFile, fork } = require('child_process');
const path = require('path');

// 1. spawn() - Para comandos com muita saída
const ls = spawn('ls', ['-la', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(\`stdout: \${data}\`);
});

ls.stderr.on('data', (data) => {
  console.error(\`stderr: \${data}\`);
});

ls.on('close', (code) => {
  console.log(\`Processo filho terminou com código \${code}\`);
});

// 2. exec() - Para comandos simples
exec('pwd', (error, stdout, stderr) => {
  if (error) {
    console.error(\`Erro: \${error}\`);
    return;
  }
  console.log(\`Diretório atual: \${stdout}\`);
});

// 3. execFile() - Para executar arquivos específicos
execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    console.error(\`Erro: \${error}\`);
    return;
  }
  console.log(\`Versão do Node.js: \${stdout}\`);
});

// 4. fork() - Para processos Node.js
// worker.js
if (process.send) {
  process.on('message', (data) => {
    const result = data.numbers.reduce((sum, num) => sum + num, 0);
    process.send({ result });
  });
}

// main.js
const worker = fork(path.join(__dirname, 'worker.js'));

worker.send({ numbers: [1, 2, 3, 4, 5] });

worker.on('message', (data) => {
  console.log(\`Resultado do worker: \${data.result}\`);
  worker.kill();
});

// 5. Exemplo avançado com spawn e pipes
const grep = spawn('grep', ['ssh']);
const ps = spawn('ps', ['aux']);

ps.stdout.pipe(grep.stdin);

grep.stdout.on('data', (data) => {
  console.log(\`Processos SSH: \${data}\`);
});`,
          goodPractice: "Use spawn() para comandos com muita saída e exec() para comandos simples com pouca saída",
          antiPattern: "Não use exec() com input do usuário sem sanitização - risco de command injection",
        },
      ],
    },
    modules: {
      title: "Core Modules Avançados",
      items: [
        {
          concept: "File System (fs) - Operações Avançadas",
          description:
            "O módulo fs oferece operações síncronas e assíncronas para manipulação de arquivos e diretórios.",
          explanation:
            "Sempre prefira versões assíncronas (fs.promises) para evitar bloqueio do Event Loop. Use streams para arquivos grandes.",
          example: `const fs = require('fs').promises;
const path = require('path');
const { createReadStream, createWriteStream } = require('fs');

// 1. Operações básicas com async/await
async function fileOperations() {
  try {
    // Verificar se arquivo existe
    await fs.access('config.json');
    console.log('Arquivo existe');
    
    // Ler arquivo
    const data = await fs.readFile('config.json', 'utf8');
    const config = JSON.parse(data);
    
    // Modificar configuração
    config.lastAccess = new Date().toISOString();
    
    // Criar backup
    await fs.copyFile('config.json', 'config.backup.json');
    
    // Escrever arquivo modificado
    await fs.writeFile('config.json', JSON.stringify(config, null, 2));
    
    console.log('Configuração atualizada');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Arquivo não encontrado');
    } else {
      console.error('Erro:', error);
    }
  }
}

// 2. Trabalhando com diretórios
async function directoryOperations() {
  const dirPath = './temp';
  
  try {
    // Criar diretório recursivamente
    await fs.mkdir(dirPath, { recursive: true });
    
    // Listar conteúdo do diretório
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const file of files) {
      const filePath = path.join(dirPath, file.name);
      const stats = await fs.stat(filePath);
      
      console.log(\`\${file.name}: \${file.isDirectory() ? 'DIR' : 'FILE'} - \${stats.size} bytes\`);
    }
    
    // Remover diretório (deve estar vazio)
    await fs.rmdir(dirPath);
  } catch (error) {
    console.error('Erro ao manipular diretório:', error);
  }
}

// 3. Monitoramento de arquivos
const watcher = fs.watch('./config', { recursive: true }, (eventType, filename) => {
  console.log(\`Evento: \${eventType} - Arquivo: \${filename}\`);
});

// Parar monitoramento após 30 segundos
setTimeout(() => {
  watcher.close();
  console.log('Monitoramento parado');
}, 30000);

// 4. Cópia eficiente de arquivos grandes
async function copyLargeFile(source, destination) {
  const readStream = createReadStream(source);
  const writeStream = createWriteStream(destination);
  
  return new Promise((resolve, reject) => {
    readStream.pipe(writeStream);
    
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
    readStream.on('error', reject);
  });
}`,
          goodPractice: "Use fs.promises para operações assíncronas e streams para arquivos grandes",
          antiPattern: "Nunca use métodos síncronos (readFileSync) em produção para arquivos grandes",
        },
        {
          concept: "HTTP/HTTPS - Servidor e Cliente Avançados",
          description: "Criação de servidores web robustos e clientes HTTP com recursos avançados.",
          explanation:
            "O módulo http fornece funcionalidades básicas, mas para produção considere usar Express.js ou Fastify.",
          example: `const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

// 1. Servidor HTTP avançado
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Logging
  console.log(\`\${new Date().toISOString()} - \${method} \${pathname}\`);
  
  // Roteamento básico
  if (method === 'GET' && pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }));
  } 
  else if (method === 'POST' && pathname === '/api/data') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        
        // Processar dados
        const response = {
          received: data,
          processed: true,
          timestamp: new Date().toISOString()
        };
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }
  else if (method === 'GET' && pathname === '/download') {
    const filename = query.file;
    if (!filename) {
      res.writeHead(400);
      res.end('Filename required');
      return;
    }
    
    const filePath = \`./uploads/\${filename}\`;
    const readStream = fs.createReadStream(filePath);
    
    readStream.on('error', () => {
      res.writeHead(404);
      res.end('File not found');
    });
    
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': \`attachment; filename="\${filename}"\`
    });
    
    readStream.pipe(res);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

// Configurações do servidor
server.timeout = 30000; // 30 segundos
server.keepAliveTimeout = 5000; // 5 segundos

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// 2. Cliente HTTP com retry e timeout
function makeRequest(options, data = null, retries = 3) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      
      res.on('data', chunk => {
        body += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        } else {
          reject(new Error(\`HTTP \${res.statusCode}: \${body}\`));
        }
      });
    });
    
    req.on('error', (error) => {
      if (retries > 0) {
        console.log(\`Tentativa falhou, restam \${retries} tentativas\`);
        setTimeout(() => {
          makeRequest(options, data, retries - 1)
            .then(resolve)
            .catch(reject);
        }, 1000);
      } else {
        reject(error);
      }
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (data) {
      req.write(data);
    }
    
    req.end();
  });
}

// Exemplo de uso do cliente
async function testClient() {
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/health',
      method: 'GET'
    });
    
    console.log('Response:', JSON.parse(response.body));
  } catch (error) {
    console.error('Request failed:', error.message);
  }
}`,
          goodPractice: "Configure timeouts, implemente retry logic e use streams para uploads/downloads grandes",
          antiPattern: "Não esqueça de tratar erros de rede e configurar limites de payload",
        },
      ],
    },
  };

  const webDevelopmentContent = {
    express: {
      title: "Express.js - Framework Completo",
      items: [
        {
          concept: "Configuração Avançada e Middlewares",
          description:
            "Express.js é o framework web mais popular para Node.js. Configuração adequada é crucial para aplicações robustas.",
          explanation:
            "Middlewares são funções que executam durante o ciclo request-response. Eles podem modificar req/res, executar código, ou terminar o ciclo.",
          example: `const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// 1. Middlewares de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// 2. CORS configurado
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://myapp.com'] 
    : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// 3. Compressão de resposta
app.use(compression());

// 4. Logging
app.use(morgan('combined'));

// 5. Parsing de body
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 6. Rate limiting por rota
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: 'Muitas requisições, tente novamente em 15 minutos',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
});

// 7. Middleware personalizado de autenticação
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Usuário inválido' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// 8. Middleware de autorização
const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Sem permissão' });
    }
    
    next();
  };
};

// 9. Aplicar middlewares às rotas
app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter);

// 10. Rotas com middleware
app.get('/api/public', (req, res) => {
  res.json({ message: 'Rota pública' });
});

app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'Rota protegida', user: req.user.email });
});

app.get('/api/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Rota de administrador' });
});

// 11. Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido' });
  }
  
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Payload muito grande' });
  }
  
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Erro interno do servidor' 
      : err.message 
  });
});

// 12. 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Servidor rodando na porta \${PORT}\`);
});`,
          goodPractice:
            "Configure middlewares na ordem correta: segurança → parsing → autenticação → rotas → error handling",
          antiPattern: "Não coloque middlewares pesados antes de rate limiting ou autenticação",
        },
      ],
    },
  };

  const authenticationContent = {
    title: "Autenticação e Autorização",
    items: [
      {
        concept: "JWT Authentication",
        example: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registro de usuário
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validação
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    
    // Hash da senha
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Salvar no banco (exemplo)
    const user = await User.create({ email, password: hashedPassword });
    
    // Gerar token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});`,
        goodPractice: "Use salt rounds altos (12+) para bcrypt e tokens com expiração",
        antiPattern: "Nunca armazene senhas em texto plano ou use algoritmos fracos",
      },
    ],
  };

  const databaseContent = {
    mongodb: {
      title: "MongoDB com Mongoose",
      items: [
        {
          concept: "Conexão e Schema",
          example: `const mongoose = require('mongoose');

// Conexão com opções de segurança
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

// Schema com validação
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Email inválido'
    }
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [8, 'Senha deve ter pelo menos 8 caracteres']
  },
  profile: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    age: { type: Number, min: 0, max: 120 }
  },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

// Middleware pre-save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);`,
          goodPractice: "Use validação no schema e middleware para operações automáticas",
          antiPattern: "Não faça queries sem tratamento de erro ou validação",
        },
        {
          concept: "Queries Avançadas",
          example: `// Busca com paginação e filtros
async function getUsers(page = 1, limit = 10, filters = {}) {
  try {
    const skip = (page - 1) * limit;
    
    // Construir query dinamicamente
    const query = {};
    if (filters.email) {
      query.email = { $regex: filters.email, $options: 'i' };
    }
    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }
    if (filters.ageMin || filters.ageMax) {
      query['profile.age'] = {};
      if (filters.ageMin) query['profile.age'].$gte = filters.ageMin;
      if (filters.ageMax) query['profile.age'].$lte = filters.ageMax;
    }
    
    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password') // Excluir senha
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(), // Melhor performance
      User.countDocuments(query)
    ]);
    
    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    throw new Error(\`Erro ao buscar usuários: \${error.message}\`);
  }
}

// Agregação complexa
async function getUserStats() {
  return await User.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: {
          $cond: {
            if: { $lt: ['$profile.age', 30] },
            then: 'young',
            else: 'adult'
          }
        },
        count: { $sum: 1 },
        avgAge: { $avg: '$profile.age' }
      }
    },
    { $sort: { count: -1 } }
  ]);
}`,
          goodPractice: "Use lean() para queries de leitura e agregação para estatísticas",
          antiPattern: "Evite queries N+1 - use populate() ou agregação",
        },
      ],
    },
    postgresql: {
      title: "PostgreSQL com Sequelize",
      items: [
        {
          concept: "Configuração e Modelos",
          example: `const { Sequelize, DataTypes } = require('sequelize');

// Configuração com pool de conexões
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

// Modelo User
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100]
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 12);
    }
  },
  indexes: [
    { fields: ['email'] },
    { fields: ['isActive'] }
  ]
});

// Associações
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });`,
          goodPractice: "Configure índices apropriados e use UUIDs para chaves primárias",
          antiPattern: "Não use auto-increment em sistemas distribuídos",
        },
      ],
    },
  };

  const testingContent = {
    jest: {
      title: "Testes com Jest",
      items: [
        {
          concept: "Testes Unitários",
          example: `// userService.test.js
const UserService = require('../services/UserService');
const User = require('../models/User');

// Mock do modelo
jest.mock('../models/User');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('deve criar um usuário com dados válidos', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe'
      };
      
      const mockUser = { id: '123', ...userData };
      User.create.mockResolvedValue(mockUser);

      // Act
      const result = await UserService.createUser(userData);

      // Assert
      expect(User.create).toHaveBeenCalledWith(userData);
      expect(result).toEqual(mockUser);
    });

    it('deve lançar erro para email inválido', async () => {
      // Arrange
      const userData = {
        email: 'invalid-email',
        password: 'password123'
      };

      // Act & Assert
      await expect(UserService.createUser(userData))
        .rejects
        .toThrow('Email inválido');
    });
  });
});`,
          goodPractice: "Use padrão AAA (Arrange, Act, Assert) e mocks para dependências",
          antiPattern: "Não teste implementação, teste comportamento",
        },
        {
          concept: "Testes de Integração",
          example: `// userRoutes.integration.test.js
const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

describe('User Routes Integration', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  describe('POST /api/users', () => {
    it('deve criar usuário com dados válidos', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(userData.email);
      expect(response.body).not.toHaveProperty('password');
    });

    it('deve retornar 400 para dados inválidos', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ email: 'invalid' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});`,
          goodPractice: "Configure banco de teste separado e limpe dados entre testes",
          antiPattern: "Não use banco de produção para testes",
        },
      ],
    },
  };

  const performanceContent = {
    optimization: {
      title: "Otimização de Performance",
      items: [
        {
          concept: "Clustering",
          example: `// cluster.js
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(\`Master \${process.pid} is running\`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork(); // Restart worker
  });
} else {
  // Workers can share any TCP port
  require('./app.js');
  console.log(\`Worker \${process.pid} started\`);
}`,
          goodPractice: "Use PM2 em produção ao invés de cluster manual",
          antiPattern: "Não use clustering para aplicações I/O bound simples",
        },
        {
          concept: "Caching com Redis",
          example: `const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('Redis server refused connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Retry time exhausted');
    }
    return Math.min(options.attempt * 100, 3000);
  }
});

// Middleware de cache
const cacheMiddleware = (duration = 300) => {
  return async (req, res, next) => {
    const key = \`cache:\${req.originalUrl}\`;
    
    try {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      // Override res.json to cache response
      const originalJson = res.json;
      res.json = function(data) {
        client.setex(key, duration, JSON.stringify(data));
        return originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      console.error('Cache error:', error);
      next();
    }
  };
};

// Uso
app.get('/api/users', cacheMiddleware(600), async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});`,
          goodPractice: "Configure TTL apropriado e fallback para falhas de cache",
          antiPattern: "Não cache dados sensíveis ou que mudam frequentemente",
        },
      ],
    },
  };

  const securityContent = {
    bestPractices: {
      title: "Práticas de Segurança",
      items: [
        {
          concept: "Validação de Input",
          example: `const Joi = require('joi');
const rateLimit = require('express-rate-limit');

// Schema de validação
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required()
});

// Middleware de validação
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: error.details.map(d => d.message)
    });
  }
  next();
};

// Rate limiting específico para login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas
  message: 'Muitas tentativas de login, tente novamente em 15 minutos',
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/login', loginLimiter, validateUser, async (req, res) => {
  // Lógica de login
});`,
          goodPractice: "Valide todos os inputs e implemente rate limiting",
          antiPattern: "Nunca confie em dados do cliente sem validação",
        },
        {
          concept: "Prevenção de Injeção",
          example: `// SQL Injection Prevention
const { QueryTypes } = require('sequelize');

// ❌ VULNERÁVEL - SQL Injection
app.get('/api/users/:id', async (req, res) => {
  const query = \`SELECT * FROM users WHERE id = \${req.params.id}\`;
  const users = await sequelize.query(query, { type: QueryTypes.SELECT });
  res.json(users);
});

// ✅ SEGURO - Prepared Statements
app.get('/api/users/:id', async (req, res) => {
  const query = 'SELECT * FROM users WHERE id = :id';
  const users = await sequelize.query(query, {
    replacements: { id: req.params.id },
    type: QueryTypes.SELECT
  });
  res.json(users);
});

// NoSQL Injection Prevention
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // ❌ VULNERÁVEL
  const user = await User.findOne({ email: email });
  
  // ✅ SEGURO - Validação de tipo
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  
  const user = await User.findOne({ 
    email: { $eq: email } // Explicit equality
  });
});`,
          goodPractice: "Use prepared statements e valide tipos de dados",
          antiPattern: "Nunca concatene strings para formar queries",
        },
      ],
    },
  };

  const deploymentContent = {
    docker: {
      title: "Deploy com Docker",
      items: [
        {
          concept: "Dockerfile Otimizado",
          example: `# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS runtime

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copiar dependências
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

# Expor porta
EXPOSE 3000

# Mudar para usuário não-root
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

CMD ["node", "server.js"]`,
          goodPractice: "Use multi-stage builds e usuário não-root",
          antiPattern: "Não rode containers como root ou inclua arquivos desnecessários",
        },
      ],
    },
  };

  const renderContent = () => {
    switch (activeTab) {
      case "fundamentals":
        return (
          <div className="space-y-8">
            {Object.entries(fundamentalsContent).map(([key, section]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.items.map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-lg mb-2">{item.concept}</h4>
                      <p className="text-muted-foreground mb-3">{item.description}</p>

                      <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 mb-4">
                        <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Como Funciona
                        </h5>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{item.explanation}</p>
                      </div>

                      <div className="bg-gray-900 rounded-lg p-4 mb-4 relative">
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 h-8 w-8 p-0 bg-transparent"
                          onClick={() => navigator.clipboard.writeText(item.example)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-green-400 text-sm overflow-x-auto pr-12">
                          <code>{item.example}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-green-700 dark:text-green-400">Boa Prática</p>
                            <p className="text-sm text-muted-foreground">{item.goodPractice}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-red-700 dark:text-red-400">Anti-Pattern</p>
                            <p className="text-sm text-muted-foreground">{item.antiPattern}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "web":
        return (
          <div className="space-y-8">
            {Object.entries(webDevelopmentContent).map(([key, section]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.items.map((item, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-lg mb-2">{item.concept}</h4>

                      <div className="bg-gray-900 rounded-lg p-4 mb-4 relative">
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 h-8 w-8 p-0 bg-transparent"
                          onClick={() => navigator.clipboard.writeText(item.example)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-green-400 text-sm overflow-x-auto pr-12">
                          <code>{item.example}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-green-700 dark:text-green-400">Boa Prática</p>
                            <p className="text-sm text-muted-foreground">{item.goodPractice}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-red-700 dark:text-red-400">Anti-Pattern</p>
                            <p className="text-sm text-muted-foreground">{item.antiPattern}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "database":
        return (
          <div className="space-y-8">
            {Object.entries(databaseContent).map(([key, section]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.items.map((item, index) => (
                    <div key={index} className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-lg mb-2">{item.concept}</h4>

                      <div className="bg-gray-900 rounded-lg p-4 mb-4 relative">
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 h-8 w-8 p-0 bg-transparent"
                          onClick={() => navigator.clipboard.writeText(item.example)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-green-400 text-sm overflow-x-auto pr-12">
                          <code>{item.example}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-green-700 dark:text-green-400">Boa Prática</p>
                            <p className="text-sm text-muted-foreground">{item.goodPractice}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-red-700 dark:text-red-400">Anti-Pattern</p>
                            <p className="text-sm text-muted-foreground">{item.antiPattern}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "testing":
        return (
          <div className="space-y-8">
            {Object.entries(testingContent).map(([key, section]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.items.map((item, index) => (
                    <div key={index} className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-semibold text-lg mb-2">{item.concept}</h4>

                      <div className="bg-gray-900 rounded-lg p-4 mb-4 relative">
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 h-8 w-8 p-0 bg-transparent"
                          onClick={() => navigator.clipboard.writeText(item.example)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-green-400 text-sm overflow-x-auto pr-12">
                          <code>{item.example}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-green-700 dark:text-green-400">Boa Prática</p>
                            <p className="text-sm text-muted-foreground">{item.goodPractice}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-red-700 dark:text-red-400">Anti-Pattern</p>
                            <p className="text-sm text-muted-foreground">{item.antiPattern}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "performance":
        return (
          <div className="space-y-8">
            {Object.entries(performanceContent).map(([key, section]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.items.map((item, index) => (
                    <div key={index} className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-lg mb-2">{item.concept}</h4>

                      <div className="bg-gray-900 rounded-lg p-4 mb-4 relative">
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 h-8 w-8 p-0 bg-transparent"
                          onClick={() => navigator.clipboard.writeText(item.example)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-green-400 text-sm overflow-x-auto pr-12">
                          <code>{item.example}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-green-700 dark:text-green-400">Boa Prática</p>
                            <p className="text-sm text-muted-foreground">{item.goodPractice}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-red-700 dark:text-red-400">Anti-Pattern</p>
                            <p className="text-sm text-muted-foreground">{item.antiPattern}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "security":
        return (
          <div className="space-y-8">
            {Object.entries(securityContent).map(([key, section]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.items.map((item, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-lg mb-2">{item.concept}</h4>

                      <div className="bg-gray-900 rounded-lg p-4 mb-4 relative">
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 h-8 w-8 p-0 bg-transparent"
                          onClick={() => navigator.clipboard.writeText(item.example)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-green-400 text-sm overflow-x-auto pr-12">
                          <code>{item.example}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-green-700 dark:text-green-400">Boa Prática</p>
                            <p className="text-sm text-muted-foreground">{item.goodPractice}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-red-700 dark:text-red-400">Anti-Pattern</p>
                            <p className="text-sm text-muted-foreground">{item.antiPattern}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "deployment":
        return (
          <div className="space-y-8">
            {Object.entries(deploymentContent).map(([key, section]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.items.map((item, index) => (
                    <div key={index} className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-semibold text-lg mb-2">{item.concept}</h4>

                      <div className="bg-gray-900 rounded-lg p-4 mb-4 relative">
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 h-8 w-8 p-0 bg-transparent"
                          onClick={() => navigator.clipboard.writeText(item.example)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-green-400 text-sm overflow-x-auto pr-12">
                          <code>{item.example}</code>
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-green-700 dark:text-green-400">Boa Prática</p>
                            <p className="text-sm text-muted-foreground">{item.goodPractice}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-red-700 dark:text-red-400">Anti-Pattern</p>
                            <p className="text-sm text-muted-foreground">{item.antiPattern}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Server className="h-10 w-10 text-green-600" />
          Node.js Completo
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Guia completo de Node.js com fundamentos avançados, desenvolvimento web, banco de dados, testes, performance e
          segurança
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="fundamentals" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            Fundamentos
          </TabsTrigger>
          <TabsTrigger value="web" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Web Dev
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Database
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Testes
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-8">
          {renderContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
