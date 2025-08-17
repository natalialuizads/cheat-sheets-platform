"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  Code2,
  Zap,
  CheckCircle,
  XCircle,
  Monitor,
  Wifi,
  HardDrive,
  Activity,
  Smartphone,
  MousePointer,
  Palette,
  Shield,
} from "lucide-react"
import { webAssemblyContent } from "@/content/webAssemblyContent" // Declare the variable here

const webAPICategories = {
  "DOM & Document": {
    icon: Monitor,
    apis: [
      {
        name: "DOM (Document Object Model)",
        description: "Interface para manipular estrutura HTML/XML",
        example: `// ✅ Bom exemplo - Manipulação DOM segura
class DOMManager {
  static createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    
    // Definir atributos de forma segura
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key.startsWith('data-')) {
        element.setAttribute(key, value);
      } else {
        element[key] = value;
      }
    });
    
    if (textContent) {
      element.textContent = textContent; // Previne XSS
    }
    
    return element;
  }
  
  static querySelector(selector, context = document) {
    try {
      return context.querySelector(selector);
    } catch (error) {
      console.error('Seletor inválido:', selector, error);
      return null;
    }
  }
  
  static addEventListener(element, event, handler, options = {}) {
    if (!element || typeof handler !== 'function') {
      console.warn('Elemento ou handler inválido');
      return;
    }
    
    element.addEventListener(event, handler, {
      passive: true, // Melhora performance
      ...options
    });
  }
}

// ❌ Anti-pattern - Manipulação DOM insegura
document.getElementById('content').innerHTML = userInput; // XSS vulnerability
document.querySelector(userSelector); // Pode quebrar com seletor inválido`,
        goodPractices: [
          "Usar textContent ao invés de innerHTML para texto",
          "Validar seletores antes de usar",
          "Usar passive listeners quando possível",
          "Cache elementos DOM frequentemente usados",
        ],
        antiPatterns: [
          "Usar innerHTML com dados não sanitizados",
          "Não validar existência de elementos",
          "Manipular DOM em loops sem otimização",
          "Não remover event listeners",
        ],
      },
      {
        name: "MutationObserver",
        description: "Observar mudanças na árvore DOM",
        example: `// ✅ Bom exemplo - MutationObserver otimizado
class DOMWatcher {
  constructor() {
    this.observers = new Map();
  }
  
  observeChanges(target, callback, options = {}) {
    const defaultOptions = {
      childList: true,
      subtree: true,
      attributes: false,
      attributeOldValue: false,
      characterData: false,
      characterDataOldValue: false
    };
    
    const observer = new MutationObserver((mutations) => {
      // Batch mutations para melhor performance
      const changes = mutations.map(mutation => ({
        type: mutation.type,
        target: mutation.target,
        addedNodes: Array.from(mutation.addedNodes),
        removedNodes: Array.from(mutation.removedNodes)
      }));
      
      callback(changes);
    });
    
    const finalOptions = { ...defaultOptions, ...options };
    observer.observe(target, finalOptions);
    
    this.observers.set(target, observer);
    return observer;
  }
  
  disconnect(target) {
    const observer = this.observers.get(target);
    if (observer) {
      observer.disconnect();
      this.observers.delete(target);
    }
  }
  
  disconnectAll() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// ❌ Anti-pattern - Observer sem cleanup
const observer = new MutationObserver(callback);
observer.observe(document.body, { childList: true, subtree: true });
// Nunca desconecta o observer - memory leak`,
        goodPractices: [
          "Sempre desconectar observers quando não precisar",
          "Usar opções específicas, não observar tudo",
          "Batch mudanças para melhor performance",
          "Evitar operações pesadas no callback",
        ],
        antiPatterns: [
          "Não desconectar observers",
          "Observar mudanças desnecessárias",
          "Callback que causa mais mutations",
          "Não implementar debounce em callbacks pesados",
        ],
      },
    ],
  },
  "Graphics & Multimedia": {
    icon: Palette,
    apis: [
      {
        name: "Canvas API",
        description: "Desenhar gráficos 2D programaticamente",
        example: `// ✅ Bom exemplo - Canvas com performance otimizada
class CanvasRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.setupCanvas();
  }
  
  setupCanvas() {
    // Configurar para alta resolução
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
  }
  
  drawOptimized() {
    // Usar requestAnimationFrame para animações
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Batch drawing operations
      this.ctx.beginPath();
      // ... drawing operations
      this.ctx.stroke();
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  // Usar offscreen canvas para operações pesadas
  processImageOffscreen(imageData) {
    const offscreen = new OffscreenCanvas(imageData.width, imageData.height);
    const offscreenCtx = offscreen.getContext('2d');
    
    // Processamento pesado no offscreen canvas
    offscreenCtx.putImageData(imageData, 0, 0);
    
    return offscreen.transferToImageBitmap();
  }
}

// ❌ Anti-pattern - Canvas sem otimização
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Redesenhar tudo a cada frame sem necessidade
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Redesenha elementos que não mudaram
}, 16);`,
        goodPractices: [
          "Usar devicePixelRatio para alta resolução",
          "Batch operações de desenho",
          "Usar requestAnimationFrame para animações",
          "Implementar dirty rectangle rendering",
        ],
        antiPatterns: [
          "Redesenhar canvas inteiro desnecessariamente",
          "Não considerar devicePixelRatio",
          "Usar setInterval ao invés de requestAnimationFrame",
          "Não otimizar operações de desenho",
        ],
      },
      {
        name: "Web Audio API",
        description: "Processamento e síntese de áudio",
        example: `// ✅ Bom exemplo - Web Audio com controle completo
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.sources = new Map();
  }
  
  async initialize() {
    try {
      // Criar contexto após interação do usuário
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Criar nó de ganho master
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      
      // Resumir contexto se suspenso
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao inicializar Web Audio:', error);
      return false;
    }
  }
  
  async loadAudioBuffer(url) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      
      return audioBuffer;
    } catch (error) {
      console.error('Erro ao carregar áudio:', error);
      throw error;
    }
  }
  
  playSound(audioBuffer, options = {}) {
    if (!this.audioContext || !audioBuffer) return;
    
    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    
    source.buffer = audioBuffer;
    source.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    // Configurar opções
    gainNode.gain.value = options.volume || 1;
    source.playbackRate.value = options.playbackRate || 1;
    
    // Cleanup automático
    source.onended = () => {
      source.disconnect();
      gainNode.disconnect();
    };
    
    source.start(0);
    return source;
  }
  
  setMasterVolume(volume) {
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
    }
  }
}

// ❌ Anti-pattern - Web Audio sem controle
const audio = new Audio('sound.mp3');
audio.play(); // Sem controle de contexto ou erro handling`,
        goodPractices: [
          "Inicializar contexto após interação do usuário",
          "Sempre fazer cleanup de nós de áudio",
          "Usar gainNode para controle de volume",
          "Tratar erros de decodificação",
        ],
        antiPatterns: [
          "Criar contexto sem interação do usuário",
          "Não fazer cleanup de AudioNodes",
          "Não tratar estados suspensos do contexto",
          "Usar Audio() ao invés de Web Audio API para controle avançado",
        ],
      },
    ],
  },
  "Connectivity & Communication": {
    icon: Wifi,
    apis: [
      {
        name: "Fetch API",
        description: "API moderna para requisições HTTP",
        example: `// ✅ Bom exemplo - Fetch com retry e timeout
class HTTPClient {
  constructor(baseURL = '', defaultOptions = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = {
      timeout: 10000,
      retries: 3,
      retryDelay: 1000,
      ...defaultOptions
    };
  }
  
  async request(url, options = {}) {
    const fullURL = this.baseURL + url;
    const config = { ...this.defaultOptions, ...options };
    
    for (let attempt = 0; attempt <= config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.timeout);
        
        const response = await fetch(fullURL, {
          ...config,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new HTTPError(response.status, response.statusText, response);
        }
        
        return response;
      } catch (error) {
        if (attempt === config.retries || error.name === 'AbortError') {
          throw error;
        }
        
        // Exponential backoff
        const delay = config.retryDelay * Math.pow(2, attempt);
        await this.sleep(delay);
      }
    }
  }
  
  async get(url, options = {}) {
    const response = await this.request(url, { ...options, method: 'GET' });
    return response.json();
  }
  
  async post(url, data, options = {}) {
    const response = await this.request(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

class HTTPError extends Error {
  constructor(status, statusText, response) {
    super(\`HTTP \${status}: \${statusText}\`);
    this.status = status;
    this.statusText = statusText;
    this.response = response;
  }
}

// ❌ Anti-pattern - Fetch sem tratamento adequado
fetch('/api/data')
  .then(response => response.json()) // Não verifica response.ok
  .then(data => console.log(data))
  .catch(error => console.log('Error')); // Tratamento genérico`,
        goodPractices: [
          "Implementar timeout e retry logic",
          "Sempre verificar response.ok",
          "Usar AbortController para cancelamento",
          "Implementar tratamento específico de erros",
        ],
        antiPatterns: [
          "Não verificar status da resposta",
          "Não implementar timeouts",
          "Tratamento genérico de erros",
          "Não cancelar requisições desnecessárias",
        ],
      },
      {
        name: "WebSocket API",
        description: "Comunicação bidirecional em tempo real",
        example: `// ✅ Bom exemplo - WebSocket com reconexão automática
class WebSocketManager {
  constructor(url, options = {}) {
    this.url = url;
    this.options = {
      reconnectInterval: 5000,
      maxReconnectAttempts: 5,
      heartbeatInterval: 30000,
      ...options
    };
    
    this.ws = null;
    this.reconnectAttempts = 0;
    this.heartbeatTimer = null;
    this.messageQueue = [];
    this.eventHandlers = new Map();
  }
  
  connect() {
    try {
      this.ws = new WebSocket(this.url);
      this.setupEventHandlers();
    } catch (error) {
      console.error('Erro ao conectar WebSocket:', error);
      this.handleReconnect();
    }
  }
  
  setupEventHandlers() {
    this.ws.onopen = (event) => {
      console.log('WebSocket conectado');
      this.reconnectAttempts = 0;
      this.startHeartbeat();
      this.flushMessageQueue();
      this.emit('open', event);
    };
    
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Tratar heartbeat
        if (data.type === 'pong') {
          return;
        }
        
        this.emit('message', data);
      } catch (error) {
        console.error('Erro ao processar mensagem:', error);
      }
    };
    
    this.ws.onclose = (event) => {
      console.log('WebSocket desconectado:', event.code, event.reason);
      this.stopHeartbeat();
      
      if (!event.wasClean && this.reconnectAttempts < this.options.maxReconnectAttempts) {
        this.handleReconnect();
      }
      
      this.emit('close', event);
    };
    
    this.ws.onerror = (error) => {
      console.error('Erro WebSocket:', error);
      this.emit('error', error);
    };
  }
  
  send(data) {
    const message = JSON.stringify(data);
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      // Enfileirar mensagem para envio posterior
      this.messageQueue.push(message);
    }
  }
  
  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, this.options.heartbeatInterval);
  }
  
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
  
  handleReconnect() {
    if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
      console.error('Máximo de tentativas de reconexão atingido');
      return;
    }
    
    this.reconnectAttempts++;
    console.log(\`Tentativa de reconexão \${this.reconnectAttempts}/\${this.options.maxReconnectAttempts}\`);
    
    setTimeout(() => {
      this.connect();
    }, this.options.reconnectInterval);
  }
  
  flushMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      this.ws.send(message);
    }
  }
  
  on(event, handler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event).push(handler);
  }
  
  emit(event, data) {
    const handlers = this.eventHandlers.get(event) || [];
    handlers.forEach(handler => handler(data));
  }
  
  close() {
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close(1000, 'Client closing');
    }
  }
}

// ❌ Anti-pattern - WebSocket sem tratamento de reconexão
const ws = new WebSocket('ws://localhost:8080');
ws.onmessage = (event) => {
  console.log(event.data); // Sem parsing ou validação
};
// Sem tratamento de desconexão ou erro`,
        goodPractices: [
          "Implementar reconexão automática",
          "Usar heartbeat para detectar desconexões",
          "Enfileirar mensagens quando desconectado",
          "Validar mensagens recebidas",
        ],
        antiPatterns: [
          "Não implementar reconexão",
          "Não tratar estados de conexão",
          "Enviar mensagens sem verificar estado",
          "Não implementar heartbeat",
        ],
      },
    ],
  },
  "Storage & Data": {
    icon: HardDrive,
    apis: [
      {
        name: "IndexedDB API",
        description: "Banco de dados NoSQL no navegador",
        example: `// ✅ Bom exemplo - IndexedDB com wrapper moderno
class IndexedDBManager {
  constructor(dbName, version = 1) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }
  
  async open(schema = {}) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Criar object stores baseado no schema
        Object.entries(schema).forEach(([storeName, config]) => {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, {
              keyPath: config.keyPath || 'id',
              autoIncrement: config.autoIncrement || false
            });
            
            // Criar índices
            if (config.indexes) {
              config.indexes.forEach(index => {
                store.createIndex(index.name, index.keyPath, {
                  unique: index.unique || false
                });
              });
            }
          }
        });
      };
    });
  }
  
  async add(storeName, data) {
    return this.performTransaction(storeName, 'readwrite', (store) => {
      return store.add(data);
    });
  }
  
  async get(storeName, key) {
    return this.performTransaction(storeName, 'readonly', (store) => {
      return store.get(key);
    });
  }
  
  async getAll(storeName, query = null, count = null) {
    return this.performTransaction(storeName, 'readonly', (store) => {
      return store.getAll(query, count);
    });
  }
  
  async update(storeName, data) {
    return this.performTransaction(storeName, 'readwrite', (store) => {
      return store.put(data);
    });
  }
  
  async delete(storeName, key) {
    return this.performTransaction(storeName, 'readwrite', (store) => {
      return store.delete(key);
    });
  }
  
  async performTransaction(storeName, mode, operation) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], mode);
      const store = transaction.objectStore(storeName);
      const request = operation(store);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async search(storeName, indexName, query) {
    return this.performTransaction(storeName, 'readonly', (store) => {
      const index = store.index(indexName);
      return index.getAll(query);
    });
  }
  
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// Uso da classe
const dbManager = new IndexedDBManager('MyApp', 1);

const schema = {
  users: {
    keyPath: 'id',
    autoIncrement: true,
    indexes: [
      { name: 'email', keyPath: 'email', unique: true },
      { name: 'name', keyPath: 'name' }
    ]
  },
  posts: {
    keyPath: 'id',
    autoIncrement: true,
    indexes: [
      { name: 'userId', keyPath: 'userId' },
      { name: 'createdAt', keyPath: 'createdAt' }
    ]
  }
};

await dbManager.open(schema);

// ❌ Anti-pattern - IndexedDB sem estrutura
const request = indexedDB.open('database');
request.onsuccess = (event) => {
  const db = event.target.result;
  const transaction = db.transaction(['store'], 'readwrite');
  const store = transaction.objectStore('store');
  store.add(data); // Sem tratamento de erro
};`,
        goodPractices: [
          "Usar wrapper para simplificar API",
          "Definir schema claro para object stores",
          "Sempre tratar erros de transação",
          "Criar índices para consultas eficientes",
        ],
        antiPatterns: [
          "Não tratar erros de transação",
          "Não definir índices apropriados",
          "Usar API diretamente sem abstração",
          "Não fechar conexões adequadamente",
        ],
      },
    ],
  },
  "Performance & Optimization": {
    icon: Activity,
    apis: [
      {
        name: "Web Workers API",
        description: "Executar JavaScript em threads separadas",
        example: `// ✅ Bom exemplo - Web Worker com pool de workers
class WorkerPool {
  constructor(workerScript, poolSize = navigator.hardwareConcurrency || 4) {
    this.workerScript = workerScript;
    this.poolSize = poolSize;
    this.workers = [];
    this.availableWorkers = [];
    this.taskQueue = [];
    this.taskId = 0;
    
    this.initializePool();
  }
  
  initializePool() {
    for (let i = 0; i < this.poolSize; i++) {
      const worker = new Worker(this.workerScript);
      worker.id = i;
      worker.busy = false;
      
      worker.onmessage = (event) => {
        this.handleWorkerMessage(worker, event);
      };
      
      worker.onerror = (error) => {
        console.error(\`Worker \${worker.id} error:\`, error);
        this.handleWorkerError(worker, error);
      };
      
      this.workers.push(worker);
      this.availableWorkers.push(worker);
    }
  }
  
  async execute(taskData, transferable = []) {
    return new Promise((resolve, reject) => {
      const task = {
        id: ++this.taskId,
        data: taskData,
        transferable,
        resolve,
        reject,
        timestamp: Date.now()
      };
      
      const worker = this.getAvailableWorker();
      if (worker) {
        this.assignTask(worker, task);
      } else {
        this.taskQueue.push(task);
      }
    });
  }
  
  getAvailableWorker() {
    return this.availableWorkers.shift() || null;
  }
  
  assignTask(worker, task) {
    worker.busy = true;
    worker.currentTask = task;
    
    worker.postMessage({
      taskId: task.id,
      data: task.data
    }, task.transferable);
  }
  
  handleWorkerMessage(worker, event) {
    const { taskId, result, error } = event.data;
    const task = worker.currentTask;
    
    if (task && task.id === taskId) {
      if (error) {
        task.reject(new Error(error));
      } else {
        task.resolve(result);
      }
      
      this.releaseWorker(worker);
    }
  }
  
  handleWorkerError(worker, error) {
    if (worker.currentTask) {
      worker.currentTask.reject(error);
      this.releaseWorker(worker);
    }
  }
  
  releaseWorker(worker) {
    worker.busy = false;
    worker.currentTask = null;
    this.availableWorkers.push(worker);
    
    // Processar próxima tarefa na fila
    if (this.taskQueue.length > 0) {
      const nextTask = this.taskQueue.shift();
      this.assignTask(worker, nextTask);
    }
  }
  
  terminate() {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    this.availableWorkers = [];
    this.taskQueue = [];
  }
  
  getStats() {
    return {
      totalWorkers: this.workers.length,
      busyWorkers: this.workers.filter(w => w.busy).length,
      queuedTasks: this.taskQueue.length
    };
  }
}

// worker.js
self.onmessage = function(event) {
  const { taskId, data } = event.data;
  
  try {
    // Simular processamento pesado
    const result = processHeavyTask(data);
    
    self.postMessage({
      taskId,
      result
    });
  } catch (error) {
    self.postMessage({
      taskId,
      error: error.message
    });
  }
};

function processHeavyTask(data) {
  // Processamento CPU-intensivo
  let result = 0;
  for (let i = 0; i < data.iterations; i++) {
    result += Math.sqrt(i) * Math.sin(i);
  }
  return result;
}

// ❌ Anti-pattern - Criar worker para cada tarefa
function badWorkerUsage(data) {
  const worker = new Worker('worker.js'); // Cria novo worker sempre
  worker.postMessage(data);
  worker.onmessage = (event) => {
    console.log(event.data);
    worker.terminate(); // Termina imediatamente
  };
}`,
        goodPractices: [
          "Usar pool de workers para reutilização",
          "Implementar sistema de filas para tarefas",
          "Transferir dados com Transferable Objects quando possível",
          "Monitorar performance e estatísticas",
        ],
        antiPatterns: [
          "Criar novo worker para cada tarefa",
          "Não implementar tratamento de erro",
          "Não terminar workers adequadamente",
          "Usar workers para tarefas simples",
        ],
      },
    ],
  },
  "Device & Hardware": {
    icon: Smartphone,
    apis: [
      {
        name: "Geolocation API",
        description: "Obter localização geográfica do usuário",
        example: `// ✅ Bom exemplo - Geolocation com cache e fallback
class LocationManager {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
  }
  
  async getCurrentPosition(options = {}) {
    const defaultOptions = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000 // 5 minutos
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    // Verificar cache primeiro
    const cacheKey = JSON.stringify(finalOptions);
    const cached = this.cache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.position;
    }
    
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation não suportada neste navegador'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const result = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: position.timestamp
          };
          
          // Cache resultado
          this.cache.set(cacheKey, {
            position: result,
            timestamp: Date.now()
          });
          
          resolve(result);
        },
        (error) => {
          const errorMessages = {
            [error.PERMISSION_DENIED]: 'Permissão de localização negada pelo usuário',
            [error.POSITION_UNAVAILABLE]: 'Informação de localização indisponível',
            [error.TIMEOUT]: 'Timeout na obtenção da localização'
          };
          
          const message = errorMessages[error.code] || 'Erro desconhecido na geolocalização';
          reject(new Error(message));
        },
        finalOptions
      );
    });
  }
  
  async watchPosition(callback, errorCallback, options = {}) {
    if (!navigator.geolocation) {
      throw new Error('Geolocation não suportada');
    }
    
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const result = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };
        callback(result);
      },
      (error) => {
        if (errorCallback) {
          errorCallback(new Error(\`Erro no watch: \${error.message}\`));
        }
      },
      options
    );
    
    return watchId;
  }
  
  clearWatch(watchId) {
    navigator.geolocation.clearWatch(watchId);
  }
  
  // Calcular distância entre duas coordenadas
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  toRadians(degrees) {
    return degrees * (Math.PI/180);
  }
  
  clearCache() {
    this.cache.clear();
  }
}

// ❌ Anti-pattern - Geolocation sem tratamento adequado
navigator.geolocation.getCurrentPosition(
  position => console.log(position), // Sem validação
  error => console.log('Erro'), // Tratamento genérico
  { timeout: 1000 } // Timeout muito baixo
);`,
        goodPractices: [
          "Implementar cache para evitar requisições desnecessárias",
          "Definir timeouts apropriados",
          "Tratar todos os tipos de erro específicamente",
          "Usar maximumAge para performance",
        ],
        antiPatterns: [
          "Não verificar suporte antes de usar",
          "Timeout muito baixo ou muito alto",
          "Não implementar cache",
          "Tratamento genérico de erros",
        ],
      },
    ],
  },
  "User Interaction": {
    icon: MousePointer,
    apis: [
      {
        name: "Clipboard API",
        description: "Interagir com área de transferência do sistema",
        example: `// ✅ Bom exemplo - Clipboard API com fallbacks
class ClipboardManager {
  constructor() {
    this.hasClipboardAPI = 'clipboard' in navigator;
    this.hasExecCommand = document.queryCommandSupported && 
                         document.queryCommandSupported('copy');
  }
  
  async writeText(text) {
    if (this.hasClipboardAPI) {
      try {
        await navigator.clipboard.writeText(text);
        return { success: true, method: 'clipboard-api' };
      } catch (error) {
        console.warn('Clipboard API falhou, tentando fallback:', error);
        return this.fallbackCopy(text);
      }
    } else {
      return this.fallbackCopy(text);
    }
  }
  
  async readText() {
    if (this.hasClipboardAPI) {
      try {
        const text = await navigator.clipboard.readText();
        return { success: true, text, method: 'clipboard-api' };
      } catch (error) {
        console.warn('Leitura do clipboard falhou:', error);
        return { success: false, error: error.message };
      }
    } else {
      return { success: false, error: 'Clipboard API não suportada' };
    }
  }
  
  fallbackCopy(text) {
    if (!this.hasExecCommand) {
      return { success: false, error: 'Nenhum método de cópia disponível' };
    }
    
    try {
      // Criar elemento temporário
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      return { 
        success: successful, 
        method: 'execCommand',
        error: successful ? null : 'execCommand falhou'
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  async writeImage(blob) {
    if (!this.hasClipboardAPI) {
      return { success: false, error: 'Clipboard API necessária para imagens' };
    }
    
    try {
      const clipboardItem = new ClipboardItem({
        [blob.type]: blob
      });
      
      await navigator.clipboard.write([clipboardItem]);
      return { success: true, method: 'clipboard-api' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  async checkPermissions() {
    if (!this.hasClipboardAPI) {
      return { read: false, write: false };
    }
    
    try {
      const readPermission = await navigator.permissions.query({ name: 'clipboard-read' });
      const writePermission = await navigator.permissions.query({ name: 'clipboard-write' });
      
      return {
        read: readPermission.state === 'granted',
        write: writePermission.state === 'granted'
      };
    } catch (error) {
      return { read: false, write: false };
    }
  }
}

// Uso da classe
const clipboard = new ClipboardManager();

// Copiar texto
document.getElementById('copyBtn').addEventListener('click', async () => {
  const result = await clipboard.writeText('Texto para copiar');
  
  if (result.success) {
    console.log(\`Copiado usando \${result.method}\`);
  } else {
    console.error('Falha ao copiar:', result.error);
  }
});

// ❌ Anti-pattern - Clipboard sem fallback
async function badClipboard(text) {
  await navigator.clipboard.writeText(text); // Pode falhar sem tratamento
}`,
        goodPractices: [
          "Implementar fallbacks para navegadores antigos",
          "Verificar permissões antes de usar",
          "Tratar erros específicos da API",
          "Suportar diferentes tipos de conteúdo",
        ],
        antiPatterns: [
          "Não implementar fallbacks",
          "Não verificar suporte da API",
          "Não tratar erros de permissão",
          "Assumir que a API sempre funciona",
        ],
      },
    ],
  },
  "Security & Identity": {
    icon: Shield,
    apis: [
      {
        name: "Web Authentication API (WebAuthn)",
        description: "Autenticação forte sem senha",
        example: `// ✅ Bom exemplo - WebAuthn com tratamento completo
class WebAuthnManager {
  constructor() {
    this.isSupported = this.checkSupport();
  }
  
  checkSupport() {
    return 'credentials' in navigator && 
           'create' in navigator.credentials &&
           'get' in navigator.credentials;
  }
  
  async registerCredential(userInfo, options = {}) {
    if (!this.isSupported) {
      throw new Error('WebAuthn não suportado neste navegador');
    }
    
    const defaultOptions = {
      challenge: this.generateChallenge(),
      rp: {
        name: "Minha Aplicação",
        id: window.location.hostname
      },
      user: {
        id: new TextEncoder().encode(userInfo.id),
        name: userInfo.email,
        displayName: userInfo.displayName
      },
      pubKeyCredParams: [
        { alg: -7, type: "public-key" }, // ES256
        { alg: -257, type: "public-key" } // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
        requireResidentKey: false
      },
      timeout: 60000,
      attestation: "direct"
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    try {
      const credential = await navigator.credentials.create({
        publicKey: finalOptions
      });
      
      return {
        success: true,
        credential: {
          id: credential.id,
          rawId: this.arrayBufferToBase64(credential.rawId),
          response: {
            attestationObject: this.arrayBufferToBase64(credential.response.attestationObject),
            clientDataJSON: this.arrayBufferToBase64(credential.response.clientDataJSON)
          },
          type: credential.type
        }
      };
    } catch (error) {
      return this.handleWebAuthnError(error);
    }
  }
  
  async authenticateCredential(challenge, allowCredentials = [], options = {}) {
    if (!this.isSupported) {
      throw new Error('WebAuthn não suportado');
    }
    
    const defaultOptions = {
      challenge: typeof challenge === 'string' ? 
                this.base64ToArrayBuffer(challenge) : challenge,
      allowCredentials: allowCredentials.map(cred => ({
        id: this.base64ToArrayBuffer(cred.id),
        type: 'public-key',
        transports: cred.transports || ['internal', 'external']
      })),
      timeout: 60000,
      userVerification: "required"
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    try {
      const assertion = await navigator.credentials.get({
        publicKey: finalOptions
      });
      
      return {
        success: true,
        assertion: {
          id: assertion.id,
          rawId: this.arrayBufferToBase64(assertion.rawId),
          response: {
            authenticatorData: this.arrayBufferToBase64(assertion.response.authenticatorData),
            clientDataJSON: this.arrayBufferToBase64(assertion.response.clientDataJSON),
            signature: this.arrayBufferToBase64(assertion.response.signature),
            userHandle: assertion.response.userHandle ? 
                       this.arrayBufferToBase64(assertion.response.userHandle) : null
          },
          type: assertion.type
        }
      };
    } catch (error) {
      return this.handleWebAuthnError(error);
    }
  }
  
  handleWebAuthnError(error) {
    const errorMessages = {
      'NotSupportedError': 'WebAuthn não suportado neste dispositivo',
      'SecurityError': 'Operação não permitida por questões de segurança',
      'NotAllowedError': 'Operação cancelada pelo usuário ou timeout',
      'InvalidStateError': 'Credencial já existe para este usuário',
      'ConstraintError': 'Requisitos não podem ser satisfeitos',
      'UnknownError': 'Erro desconhecido no autenticador'
    };
    
    const message = errorMessages[error.name] || error.message;
    
    return {
      success: false,
      error: {
        name: error.name,
        message: message
      }
    };
  }
  
  generateChallenge() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return array;
  }
  
  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  
  base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
  
  async isUserVerifyingPlatformAuthenticatorAvailable() {
    if (!this.isSupported) return false;
    
    try {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch (error) {
      return false;
    }
  }
}

// ❌ Anti-pattern - WebAuthn sem tratamento de erro
async function badWebAuthn() {
  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: new Uint8Array(32), // Challenge fixo
      rp: { name: "App" },
      user: { id: new Uint8Array(8), name: "user", displayName: "User" },
      pubKeyCredParams: [{ alg: -7, type: "public-key" }]
    }
  }); // Sem tratamento de erro
}`,
        goodPractices: [
          "Sempre verificar suporte antes de usar",
          "Implementar tratamento específico de erros",
          "Usar challenges únicos e seguros",
          "Configurar opções apropriadas para o contexto",
        ],
        antiPatterns: [
          "Não verificar suporte da API",
          "Usar challenges fixos ou previsíveis",
          "Não tratar erros específicos",
          "Não configurar timeouts apropriados",
        ],
      },
    ],
  },
}

export function WebAPISection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedAPI, setSelectedAPI] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("categories")

  if (selectedAPI) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setSelectedAPI(null)}>
            ← Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{selectedAPI.name}</h1>
            <p className="text-muted-foreground">{selectedAPI.description}</p>
          </div>
        </div>

        <Tabs defaultValue="example" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="example">Exemplo</TabsTrigger>
            <TabsTrigger value="practices">Boas Práticas</TabsTrigger>
            <TabsTrigger value="antipatterns">Anti-patterns</TabsTrigger>
          </TabsList>

          <TabsContent value="example" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Exemplo Prático
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{selectedAPI.example}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Boas Práticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {selectedAPI.goodPractices.map((practice: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="antipatterns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Anti-patterns (O que evitar)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {selectedAPI.antiPatterns.map((antiPattern: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{antiPattern}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  if (selectedCategory) {
    const category = webAPICategories[selectedCategory as keyof typeof webAPICategories]
    const IconComponent = category.icon

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setSelectedCategory(null)}>
            ← Voltar às Categorias
          </Button>
          <div className="flex items-center gap-3">
            <IconComponent className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">{selectedCategory}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {category.apis.map((api, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedAPI(api)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{api.name}</CardTitle>
                <CardDescription>{api.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Ver Exemplos e Práticas</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Globe className="h-10 w-10" />
          WebAPI & WebAssembly
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Guia completo de Web APIs modernas organizadas por categoria, com exemplos práticos e boas práticas
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categories">Web APIs por Categoria</TabsTrigger>
          <TabsTrigger value="webassembly">WebAssembly</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(webAPICategories).map(([categoryName, category]) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={categoryName}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedCategory(categoryName)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline">{category.apis.length} APIs</Badge>
                    </div>
                    <CardTitle className="text-xl">{categoryName}</CardTitle>
                    <CardDescription>{category.apis.map((api) => api.name).join(", ")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Explorar APIs</Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="webassembly" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-6 w-6" />
                  {webAssemblyContent.concepts.title}
                </CardTitle>
                <CardDescription>{webAssemblyContent.concepts.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {webAssemblyContent.concepts.topics.map((topic, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg">{topic.name}</h4>
                    <p className="text-muted-foreground mb-2">{topic.description}</p>
                    <ul className="space-y-1">
                      {topic.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6" />
                  {webAssemblyContent.compilation.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="example" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="example">Exemplo Completo</TabsTrigger>
                    <TabsTrigger value="practices">Boas Práticas</TabsTrigger>
                    <TabsTrigger value="antipatterns">Anti-patterns</TabsTrigger>
                  </TabsList>

                  <TabsContent value="example" className="space-y-4">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{webAssemblyContent.compilation.example}</code>
                    </pre>
                  </TabsContent>

                  <TabsContent value="practices" className="space-y-4">
                    <ul className="space-y-3">
                      {webAssemblyContent.compilation.goodPractices.map((practice, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="antipatterns" className="space-y-4">
                    <ul className="space-y-3">
                      {webAssemblyContent.compilation.antiPatterns.map((antiPattern, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{antiPattern}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
