// получение только перечислимых свойств самого объекта (не из цепочки прототипов)
for (let name in map) {
    if (map.hasOwnProperty(name)) {
        // map[name] -- личное свойство map
    }
}