import { OpenIDConnectScheme } from '~auth/runtime'

export default class IdmappScheme extends OpenIDConnectScheme {
  async fetchUser () {
    if (!this.check().valid) {
      return
    }

    if (this.options.endpoints.userInfo) {
      const { data } = await this.$auth.requestWith(this.name, {
        url: this.options.endpoints.userInfo
      })
      this.$auth.setUser(data)
      return
    }

    if (this.idToken.get()) {
      const data = this.idToken.userInfo()
      this.$auth.setUser(data)
      return
    }

    this.$auth.setUser({})
  }
}
