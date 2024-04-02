import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'zh', // 默认语言
  messages: {
    en: {
      docs: 'Docs',
      chat: 'aiChat',
      login: 'login',
      setting: 'Setting',
      language: 'language:',
      user: 'user',
      create: 'create',
      save: 'save',
      basic: 'basic',
      know: 'have a easy know to us!',
      function: 'function',
      home: 'home',
      close: 'close',
      data: 'data',
    },
    zh: {
      docs: '文档',
      chat: 'ai聊天',
      login: '登录',
      setting: '设置',
      language: '语言：',
      user: '用户',
      create: '创建',
      save: '保存',
      basic: '仓库',
      know: '简单的了解下我们!',
      function: '功能',
      home: '主页',
      close: '关闭',
      data: '数据',
    }
  }
});

export default i18n;
