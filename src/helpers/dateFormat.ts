const formatDate = (microsoft_date : number) => {
    const miliseconds = (microsoft_date - 25569) * 86400 * 1000 
    const date = new Date(miliseconds)
    let mm : (number | string) = date.getMonth() + 1 
    const yyyy = date.getFullYear() 
    let dd : (number | string) = date.getDate() 
    if (Number(dd) < 10) dd = '0' + dd
    if (Number(mm) < 10) mm = '0' + mm 
    return dd + '-' + mm + '-' + yyyy 
}

export default formatDate