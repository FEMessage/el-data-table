import zh from './zh'
import en from './en'

const langs = {zh, en}

export const InitialLang = lang => {
  return langs[lang]
}

export const MixinLang = {
  computed: {
    $lang() {
      return langs[this.lang]
    }
  }
}
