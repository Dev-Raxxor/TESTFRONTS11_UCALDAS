export default class Helpers {
  /**
   * Aplica las reglas de validación definidas para un formulario HTML.
   * Incluso puede indicar un callback como segundo argumento para complementar la validación
   * @param {String} formSelector Una regla CSS para referenciar el formulario a validar
   */
  static okForm = (formSelector, callBack) => {
    let ok = true
    const form = document.querySelector(formSelector)
    // si los datos del formulario no son válidos, forzar un submit para que se muestren los errores
    if (!form.checkValidity()) {
      let tmpSubmit = document.createElement('button')
      form.appendChild(tmpSubmit)
      tmpSubmit.click()
      form.removeChild(tmpSubmit)
      ok = false
    }
    if (typeof callBack === 'function') {
      ok = ok && callBack()
    }
    return ok
  }

  /**
   * Carga un recurso de tipo texto en una capa de la aplicación
   * @param {String} url La ruta donde se encuentra el recurso
   * @param {String} container Opcionalmente, la capa donde se inserta el contenido
   * @returns Si el segundo argumento se da, se retorna el container, si no se retorna el recurso
   */
  static async fetchText(url, container = null) {
    try {
      const response = await fetch(url)

      if (response.ok) {
        const html = await response.text()
        const element = document.querySelector(container)
        if (element) {
          element.innerHTML = html
        }
        return element || html // para permitir encadenamiento o para retornar el HTML
      } else {
        return `Se reporta ${response.status} - ${response.statusText}, al intentar acceder al recurso '${url}'`
      }
    } catch (e) {
      return `Se reporta ${e.message}, al intentar acceder al recurso '${url}'`
    }
  }
}