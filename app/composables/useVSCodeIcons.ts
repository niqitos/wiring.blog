export interface IconConfig {
  filename: string
  icon: string
  isFolder: boolean
  theme?: string
}

export interface VSCodeIconsOptions {
  theme?: 'light' | 'dark'
  prefix?: string
}

// composables/useVSCodeIcons.ts
export const useVSCodeIcons = () => {
  // File extension to icon mappings
  const extensionMap = {
    // Programming Languages
    'js': 'javascript',
    'jsx': 'react',
    'ts': 'typescript',
    'tsx': 'react-ts',
    'vue': 'vue',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'ino': 'arduino',
    'c': 'c',
    'cs': 'csharp',
    'php': 'php',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'swift': 'swift',
    'kt': 'kotlin',
    'dart': 'dart',
    'scala': 'scala',
    'sh': 'console',
    'bash': 'console',
    'zsh': 'console',
    'fish': 'console',
    'ps1': 'powershell',

    // Web Technologies
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'sass',
    'sass': 'sass',
    'less': 'less',
    'svelte': 'svelte',
    'angular': 'angular',

    // Data/Config Files
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'toml': 'toml',
    'ini': 'settings',
    'env': 'tune',

    // Documentation
    'md': 'markdown',
    'markdown': 'markdown',
    'txt': 'document',
    'rtf': 'document',
    'pdf': 'pdf',
    'doc': 'word',
    'docx': 'word',
    'xls': 'excel',
    'xlsx': 'excel',
    'ppt': 'powerpoint',
    'pptx': 'powerpoint',

    // Images
    'png': 'image',
    'jpg': 'image',
    'jpeg': 'image',
    'gif': 'image',
    'svg': 'svg',
    'ico': 'image',
    'webp': 'image',
    'bmp': 'image',

    // Archives
    'zip': 'zip',
    'rar': 'zip',
    '7z': 'zip',
    'tar': 'zip',
    'gz': 'zip',

    // Database
    'sql': 'database',
    'db': 'database',
    'sqlite': 'database',

    // Other
    'log': 'console',
    'lock': 'lock',
    'gitignore': 'git',
    'dockerfile': 'docker',
    'makefile': 'makefile'
  } as const

  // Specific filename mappings
  const filenameMap = {
    // Nuxt.js specific files
    'nuxt.config.js': 'nuxt',
    'nuxt.config.ts': 'nuxt',
    'app.vue': 'vue',
    'error.vue': 'vue',
    'app.config.ts': 'nuxt',
    'nitro.config.ts': 'nuxt',

    // Git files
    '.gitignore': 'git',
    '.gitmodules': 'git',
    '.gitattributes': 'git',

    // Package managers
    'package.json': 'nodejs',
    'package-lock.json': 'nodejs',
    'yarn.lock': 'yarn',
    'pnpm-lock.yaml': 'pnpm',
    'composer.json': 'php',
    'Gemfile': 'ruby',
    'Gemfile.lock': 'ruby',
    'Pipfile': 'python',
    'requirements.txt': 'python',
    'setup.py': 'python',
    'Cargo.toml': 'rust',
    'Cargo.lock': 'rust',
    'go.mod': 'go',
    'go.sum': 'go',

    // Build files
    'Dockerfile': 'docker',
    'docker-compose.yml': 'docker',
    'docker-compose.yaml': 'docker',
    'Makefile': 'gear',
    'webpack.config.js': 'webpack',
    'rollup.config.js': 'rollup',
    'vite.config.js': 'vite',
    'vite.config.ts': 'vite',
    'gulpfile.js': 'gulp',
    'gruntfile.js': 'grunt',

    // Config files
    '.eslintrc': 'eslint',
    '.eslintrc.js': 'eslint',
    '.eslintrc.json': 'eslint',
    '.prettierrc': 'prettier',
    'prettier.config.js': 'prettier',
    'tsconfig.json': 'typescript',
    'jsconfig.json': 'javascript',
    '.babelrc': 'babel',
    'babel.config.js': 'babel',
    'tailwind.config.js': 'tailwind',
    'tailwind.config.ts': 'tailwind',

    // IDE/Editor files
    '.vscode': 'vscode',
    '.editorconfig': 'settings',

    // Documentation
    'README.md': 'readme',
    'README.txt': 'readme',
    'CHANGELOG.md': 'changelog',
    'CHANGELOG.txt': 'changelog',
    'LICENSE': 'license',
    'LICENSE.txt': 'license',
    'LICENSE.md': 'license',

    // Environment
    '.env': 'tune',
    '.env.local': 'tune',
    '.env.development': 'tune',
    '.env.production': 'tune',
    '.env.example': 'tune',

    // CI/CD
    '.travis.yml': 'travis',
    '.github': 'github-actions-workflow',
    'appveyor.yml': 'appveyor',
    'circle.yml': 'circleci',
    'azure-pipelines.yml': 'azure'
  } as const

  const folderMap = {
    // Nuxt.js specific folders
    'pages': 'folder-nuxt',
    'layouts': 'folder-nuxt',
    'middleware': 'folder-nuxt',
    'plugins': 'folder-nuxt',
    'composables': 'folder-nuxt',
    'utils': 'folder-utils',
    'server': 'folder-server',
    'stores': 'folder-store',

    // Common folders
    'node_modules': 'folder-node',
    '.git': 'folder-git',
    '.vscode': 'folder-vscode',
    'src': 'folder-src',
    'lib': 'folder-lib',
    'dist': 'folder-dist',
    'build': 'folder-build',
    '.output': 'folder-dist',
    '.nuxt': 'folder-nuxt',
    'test': 'folder-test',
    'tests': 'folder-test',
    '__tests__': 'folder-test',
    'spec': 'folder-test',
    'docs': 'folder-docs',
    'documentation': 'folder-docs',
    'assets': 'folder-resource',
    'public': 'folder-public',
    'static': 'folder-resource',
    'images': 'folder-images',
    'img': 'folder-images',
    'css': 'folder-css',
    'js': 'folder-js',
    'javascript': 'folder-js',
    'ts': 'folder-typescript',
    'typescript': 'folder-typescript',
    'components': 'folder-components',
    'views': 'folder-views',
    'controllers': 'folder-controller',
    'models': 'folder-class',
    'routes': 'folder-routes',
    'helpers': 'folder-helper',
    'config': 'folder-config',
    'database': 'folder-database',
    'db': 'folder-database'
  } as const

  const markdownLanguageMap = {
    // JavaScript variants
    'javascript': 'javascript',
    'js': 'javascript',
    'jsx': 'react',
    'typescript': 'typescript',
    'ts': 'typescript',
    'tsx': 'react-ts',

    // Web technologies
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'sass',
    'sass': 'sass',
    'less': 'less',
    'stylus': 'stylus',

    // Frameworks
    'vue': 'vue',
    'react': 'react',
    'angular': 'angular',
    'svelte': 'svelte',
    'nuxt': 'nuxt',
    'next': 'next',

    // Programming languages
    'python': 'python',
    'py': 'python',
    'java': 'java',
    'kotlin': 'kotlin',
    'kt': 'kotlin',
    'scala': 'scala',
    'groovy': 'groovy',

    // C-family
    'c': 'c',
    'cpp': 'cpp',
    'c++': 'cpp',
    'cxx': 'cpp',
    'cc': 'cpp',
    'csharp': 'csharp',
    'cs': 'csharp',
    'c#': 'csharp',

    // Other languages
    'php': 'php',
    'ruby': 'ruby',
    'rb': 'ruby',
    'go': 'go',
    'golang': 'go',
    'rust': 'rust',
    'rs': 'rust',
    'swift': 'swift',
    'dart': 'dart',
    'elixir': 'elixir',
    'ex': 'elixir',
    'erlang': 'erlang',
    'erl': 'erlang',
    'haskell': 'haskell',
    'hs': 'haskell',
    'clojure': 'clojure',
    'clj': 'clojure',
    'cljs': 'clojure',
    'f#': 'fsharp',
    'fsharp': 'fsharp',
    'fs': 'fsharp',
    'r': 'r',
    'julia': 'julia',
    'jl': 'julia',
    'lua': 'lua',
    'perl': 'perl',
    'pl': 'perl',

    // Shell scripting
    'bash': 'console',
    'sh': 'console',
    'shell': 'console',
    'zsh': 'console',
    'fish': 'console',
    'powershell': 'powershell',
    'ps1': 'powershell',
    'pwsh': 'powershell',
    'cmd': 'console',
    'batch': 'console',
    'bat': 'console',

    // Data formats
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'toml': 'toml',
    'ini': 'settings',
    'csv': 'table',

    // Markup and documentation
    'markdown': 'markdown',
    'md': 'markdown',
    'mdx': 'mdx',
    'tex': 'latex',
    'latex': 'latexmk',
    'rst': 'document',
    'asciidoc': 'document',
    'org': 'document',

    // Database
    'sql': 'database',
    'mysql': 'database',
    'postgresql': 'database',
    'sqlite': 'database',
    'plsql': 'database',
    'tsql': 'database',

    // Config files
    'dockerfile': 'docker',
    'docker': 'docker',
    'makefile': 'gear',
    'make': 'gear',
    'cmake': 'gear',
    'nginx': 'nginx',
    'apache': 'apache',
    'htaccess': 'apache',

    // Version control
    'git': 'git',
    'gitignore': 'git',
    'gitconfig': 'git',
    'diff': 'diff',
    'patch': 'diff',

    // Other formats
    'graphql': 'graphql',
    'gql': 'graphql',
    'prisma': 'prisma',
    'proto': 'proto',
    'protobuf': 'proto',
    'wasm': 'wasm',
    'webassembly': 'webassembly',
    'asm': 'webassembly',
    'assembly': 'webassembly',
    'nasm': 'webassembly',
    'vim': 'vim',
    'viml': 'vim',
    'emacs': 'emacs',
    'lisp': 'lisp',
    'scheme': 'lisp',

    // Build tools and configs
    'webpack': 'webpack',
    'rollup': 'rollup',
    'vite': 'vite',
    'gulp': 'gulp',
    'grunt': 'grunt',
    'babel': 'babel',
    'eslint': 'eslint',
    'prettier': 'prettier',
    'tailwind': 'tailwind',

    // Cloud and infrastructure
    'terraform': 'terraform',
    'tf': 'terraform',
    'ansible': 'ansible',
    'kubernetes': 'kubernetes',
    'k8s': 'kubernetes',
    'helm': 'helm',
    'aws': 'aws',
    'azure': 'azure',
    'gcp': 'gcp',

    // Text/Plain
    'text': 'document',
    'txt': 'document',
    'plain': 'document',
    'log': 'console',

    // Fallback
    'code': 'document',
    'source': 'document'
  } as const

  const getIcon = (filename: string, isFolder = false): string => {
    if (isFolder) {
      return getFolderIcon(filename)
    }
    return getFileIcon(filename)
  }

  const getFileIcon = (filename: string): string => {
    const lowerFilename = filename.toLowerCase()

    if (filenameMap[lowerFilename as keyof typeof filenameMap]) {
      return filenameMap[lowerFilename as keyof typeof filenameMap]
    }

    const exactMatch = Object.keys(filenameMap).find(
      key => key.toLowerCase() === lowerFilename
    )
    if (exactMatch) {
      return filenameMap[exactMatch as keyof typeof filenameMap]
    }

    const lastDotIndex = filename.lastIndexOf('.')
    if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
      return 'document'
    }

    const extension = filename.substring(lastDotIndex + 1).toLowerCase()

    if (extensionMap[extension as keyof typeof extensionMap]) {
      return extensionMap[extension as keyof typeof extensionMap]
    }

    return 'document'
  }

  const getFolderIcon = (foldername: string): string => {
    const lowerFoldername = foldername.toLowerCase()

    if (folderMap[lowerFoldername as keyof typeof folderMap]) {
      return folderMap[lowerFoldername as keyof typeof folderMap]
    }

    return 'folder'
  }

  const getLanguageIcon = (langName: string): string => {
    if (!langName) return 'code'

    const normalizedLang = langName.toLowerCase().trim()

    // Direct mapping from markdown language names
    if (markdownLanguageMap[normalizedLang as keyof typeof markdownLanguageMap]) {
      return markdownLanguageMap[normalizedLang as keyof typeof markdownLanguageMap]
    }

    // Try to match partial names or common aliases
    const partialMatches: Record<string, string> = {
      'node': 'nodejs',
      'react': 'react',
      'angular': 'angular',
      'vue': 'vue',
      'nuxt': 'nuxt',
      'next': 'nextjs',
      'django': 'python',
      'flask': 'python',
      'rails': 'ruby',
      'laravel': 'php',
      'spring': 'java',
      'dotnet': 'csharp',
      '.net': 'csharp',
      'unity': 'csharp',
      'unreal': 'cpp'
    }

    for (const [partial, icon] of Object.entries(partialMatches)) {
      if (normalizedLang.includes(partial)) {
        return icon
      }
    }

    return 'code'
  }

  const isLanguageSupported = (langName: string): boolean => {
    if (!langName) return false
    const normalizedLang = langName.toLowerCase().trim()
    return normalizedLang in markdownLanguageMap
  }

  return {
    getIcon,
    getFileIcon,
    getFolderIcon,
    getLanguageIcon,
    isLanguageSupported,
    extensionMap,
    filenameMap,
    folderMap
  }
}
