const fs = require('fs');

const NUMBER_CONTENT_FOR_LINE = 4

const getContetFile = pathFile => {
  const buffer = fs.readFileSync(pathFile, 'utf8')
  return buffer.toString();
}

const getGroupPeoples = (nameFile) => {
  const content = getContetFile(`${nameFile}`).split(',')
  const groupsPeoples = []

  while (content.length > 0) {
    const group = content.splice(0, NUMBER_CONTENT_FOR_LINE);
    group[0] = String(group[0]).trim()
    group[1] = String(group[1]).trim()
    group[2] = String(group[2]).trim()
    group[3] = String(group[3]).trim()
    groupsPeoples.push([...group])
  }
  groupsPeoples.pop()

  return groupsPeoples;
}

const pause = time => new Promise(res => setTimeout(() => { res(); }, time))

const getFormatTo = (to, type) => {
  if (type === 'c') return `${to}@c.us`
  
  return `${to}@g.us`
}

module.exports = {
  getGroupPeoples, pause, getFormatTo
} 