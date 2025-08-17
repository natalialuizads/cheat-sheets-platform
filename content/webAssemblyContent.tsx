export const webAssemblyContent = {
  concepts: {
    title: "Conceitos Fundamentais",
    description:
      "WebAssembly (WASM) é um formato de código binário que permite executar código de alta performance no navegador",
    topics: [
      {
        name: "O que é WebAssembly",
        description: "Formato de instrução binária para máquina virtual baseada em stack",
        details: [
          "Compilação de linguagens como C, C++, Rust para a web",
          "Execução próxima à velocidade nativa",
          "Seguro e sandboxed",
          "Complementa JavaScript, não substitui",
        ],
      },
      {
        name: "Casos de Uso",
        description: "Quando usar WebAssembly em suas aplicações",
        details: [
          "Processamento de imagem/vídeo",
          "Jogos e simulações",
          "Criptografia e compressão",
          "Porting de aplicações desktop",
        ],
      },
    ],
  },
  compilation: {
    title: "Compilação e Integração",
    example: `// ✅ Bom exemplo - Carregando WASM com tratamento de erro
class WasmModule {
  constructor() {
    this.module = null;
    this.memory = null;
  }
  
  async loadModule(wasmPath) {
    try {
      // Verificar suporte
      if (!WebAssembly) {
        throw new Error('WebAssembly não suportado neste navegador');
      }
      
      // Carregar e compilar
      const wasmArrayBuffer = await fetch(wasmPath)
        .then(response => {
          if (!response.ok) {
            throw new Error(\`Failed to fetch WASM: \${response.status}\`);
          }
          return response.arrayBuffer();
        });
      
      const wasmModule = await WebAssembly.compile(wasmArrayBuffer);
      
      // Instanciar com imports
      const imports = {
        env: {
          memory: new WebAssembly.Memory({ initial: 256 }),
          console_log: (ptr, len) => {
            const bytes = new Uint8Array(this.memory.buffer, ptr, len);
            const string = new TextDecoder('utf8').decode(bytes);
            console.log(string);
          }
        }
      };
      
      this.instance = await WebAssembly.instantiate(wasmModule, imports);
      this.memory = imports.env.memory;
      
      return this.instance;
    } catch (error) {
      console.error('Erro ao carregar WASM:', error);
      throw error;
    }
  }
  
  // Wrapper para função WASM
  calculateFibonacci(n) {
    if (!this.instance) {
      throw new Error('WASM module não carregado');
    }
    
    try {
      return this.instance.exports.fibonacci(n);
    } catch (error) {
      console.error('Erro ao executar função WASM:', error);
      throw error;
    }
  }
  
  // Gerenciar memória
  allocateString(str) {
    const bytes = new TextEncoder().encode(str);
    const ptr = this.instance.exports.malloc(bytes.length);
    const memory = new Uint8Array(this.memory.buffer);
    memory.set(bytes, ptr);
    return { ptr, len: bytes.length };
  }
  
  deallocate(ptr) {
    this.instance.exports.free(ptr);
  }
}

// Uso da classe
async function initWasm() {
  const wasmModule = new WasmModule();
  
  try {
    await wasmModule.loadModule('/math.wasm');
    
    // Usar funções WASM
    const result = wasmModule.calculateFibonacci(40);
    console.log('Fibonacci(40):', result);
    
  } catch (error) {
    console.error('Falha ao inicializar WASM:', error);
    // Fallback para implementação JavaScript
    console.log('Usando fallback JavaScript');
  }
}

// ❌ Anti-pattern - Carregamento sem tratamento de erro
fetch('/module.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(result => {
    // Usar sem verificações
    result.instance.exports.myFunction();
  });`,
    goodPractices: [
      "Sempre verificar suporte a WebAssembly",
      "Implementar fallbacks JavaScript",
      "Gerenciar memória adequadamente",
      "Tratar erros de compilação e execução",
    ],
    antiPatterns: [
      "Não verificar suporte do navegador",
      "Não implementar fallbacks",
      "Vazamentos de memória",
      "Não tratar erros de carregamento",
    ],
  },
}
