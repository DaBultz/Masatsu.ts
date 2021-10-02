import signale, { DefaultMethods, Signale, SignaleOptions } from 'signale'

// https://github.com/klaussinani/signale/issues/44#issuecomment-860187239
export const getLogger = (scope: string, options: SignaleOptions = {}): Signale<DefaultMethods> & { breakInteractiveChain: () => void } =>
  Object.assign(new Signale({ scope, ...options }), {
    // eslint-disable-next-line no-console
    breakInteractiveChain: () => console.log()
  })

export default signale
