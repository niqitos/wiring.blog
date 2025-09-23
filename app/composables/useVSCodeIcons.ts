// types/vscode-icons.ts
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
    'tsx': 'react_ts',
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
    'sh': 'shell',
    'bash': 'shell',
    'zsh': 'shell',
    'fish': 'shell',
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
    'makefile': 'gear'
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
    '.github': 'github',
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
    'node_modules': 'folder-npm',
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
    'assets': 'folder-assets',
    'public': 'folder-public',
    'static': 'folder-static',
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
    'models': 'folder-model',
    'routes': 'folder-routes',
    'helpers': 'folder-helper',
    'config': 'folder-config',
    'database': 'folder-database',
    'db': 'folder-database'
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
      return 'default'
    }

    const extension = filename.substring(lastDotIndex + 1).toLowerCase()

    if (extensionMap[extension as keyof typeof extensionMap]) {
      return extensionMap[extension as keyof typeof extensionMap]
    }

    return 'default'
  }

  const getFolderIcon = (foldername: string): string => {
    const lowerFoldername = foldername.toLowerCase()

    if (folderMap[lowerFoldername as keyof typeof folderMap]) {
      return folderMap[lowerFoldername as keyof typeof folderMap]
    }

    return 'folder'
  }

  return {
    getIcon,
    getFileIcon,
    getFolderIcon,
    extensionMap,
    filenameMap,
    folderMap
  }
}
