const treeViewGen = (x) => {
    var re = []
    x.forEach(e => {
        if(e.parents.length == 0) {
            re.push(e)
        }
    })

    const r = (name) => {
        var el = {}
        var chn = []
        x.forEach(e => {
            if(e.name == name) {
                el = e
            }
        })
        if(el.children.length == 0) {
            return []
        } else {
            el.children.forEach(elc => {
                chn.push({
                    "title": elc,
                    "key": elc,
                    "children": r(elc)
                })
            })
        }
        return chn
    }

    var final = []
    re.forEach(el => {
        final.push({
            "title": el.name,
            "key": el.name,
            "children": r(el.name)
        })
    })
    return final
}


module.exports = treeViewGen