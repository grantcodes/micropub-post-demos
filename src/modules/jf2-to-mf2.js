export default function(jf2) {
  let mf2 = { type: 'h-entry', properties: {} }
  if (jf2.type) {
    mf2.type = 'h-' + jf2.type
    delete jf2.type
  }
  Object.keys(jf2).forEach(property => {
    let value = jf2[property]
    if (!Array.isArray(value)) {
      value = [value]
    }
    mf2.properties[property] = value
  })
  return mf2
}
