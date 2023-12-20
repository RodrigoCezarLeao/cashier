export const formatTimestamp = (date: string) => {
    let result = "";

    const cDate = new Date(date);
    const day = `${cDate.getDate().toString().padStart(2, '0')}`;
    const month = `${(cDate.getMonth() + 1).toString().padStart(2, '0')}`;
    const year = `${cDate.getFullYear().toString()}`;
    const hour = `${cDate.getHours().toString().padStart(2, '0')}`;
    const minute = `${cDate.getMinutes().toString().padStart(2, '0')}`;
    
    const fDate = `${day}/${month}/${year} - ${hour}:${minute}`;
    result = fDate;
    
    return result;
}