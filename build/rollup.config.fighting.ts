import nodeResolve from '@rollup/plugin-node-resolve' // 告诉 Rollup 如何查找外部模块
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import vuePlugin from 'rollup-plugin-vue' // 处理vue文件
import { resolve } from 'path'

const input = resolve(__dirname, '../packages/fighting-design') // 入口文件
const output = resolve(__dirname, '../dist/dist') // 输出文件

const config = [
  {
    input: `${input}/index.ts`,
    external: ['vue'],
    plugins: [
      terser(),
      nodeResolve(),
      vuePlugin({
        target: 'browser',
        exposeFilename: false
      }),
      typescript({
        useTsconfigDeclarationDir: false,
        tsconfigOverride: {
          include: ['packages/**/*'],
          exclude: ['node_modules', 'examples', 'mobile', 'tests']
        },
        abortOnError: false
      })
    ],
    output: {
      // // 文件输出的格式 "amd", "cjs", "system", "es", "iife" or "umd".
      format: 'es',
      file: `${output}/index.js`
    }
  }
]

export default config