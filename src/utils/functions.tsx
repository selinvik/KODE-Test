  const allowedSymbols = '0123456789+';

  export function formatPhoneNumberToView(phoneNumberStr: string){
    let clearedPhoneStr = '';
    for (let i = 0; i < phoneNumberStr.length; i++) {
      if(allowedSymbols.indexOf(phoneNumberStr[i]) >= 0)
        clearedPhoneStr += phoneNumberStr[i]; 
    }

    if (clearedPhoneStr.length > 12)
      clearedPhoneStr = clearedPhoneStr.substr(0, 12);

    let result = '';
    let p1 = clearedPhoneStr.substr(0, 2);
    if (p1){
      if(p1[0] !== '+'){
        p1 = clearedPhoneStr.substr(0, 1);
          result += p1;
        const p2 = clearedPhoneStr.substr(1,3);
        if (p2)
          result += ' (' + p2;
        const p3 = clearedPhoneStr.substr(4, 3);
        if (p3)
          result +=  ') ' + p3;
        const p4 = clearedPhoneStr.substr(7, 2);
        if (p4)
          result += '-' + p4;
        const p5 = clearedPhoneStr.substr(9,2);
        if (p5)
          result += '-' + p5;
      }
      else {
        result += p1;
        const p2 = clearedPhoneStr.substr(2,3);
        if (p2)
          result += ' (' + p2;
        const p3 = clearedPhoneStr.substr(5, 3);
        if (p3)
          result +=  ') ' + p3;
        const p4 = clearedPhoneStr.substr(8, 2);
        if (p4)
          result += '-' + p4;
        const p5 = clearedPhoneStr.substr(10,2);
        if (p5)
          result += '-' + p5;
      }
    }
    return result;
  }

  export function formatPhoneNumberToRequest (phoneNumberStr: string){
    let clearedPhoneStr = '';

    for (let i = 0; i < phoneNumberStr.length; i++) {
      if(allowedSymbols.indexOf(phoneNumberStr[i]) >= 0)
        clearedPhoneStr += phoneNumberStr[i]; 
    }

    let p1 = clearedPhoneStr.substr(0, 1);
    if(p1){
      if(p1[0] !== '+'){
        if (clearedPhoneStr.length > 11)
          clearedPhoneStr = clearedPhoneStr.substr(0, 11);
      } else {
        if (clearedPhoneStr.length > 12)
          clearedPhoneStr = clearedPhoneStr.substr(0, 12);
      }
    }

    if (clearedPhoneStr.length > 12)
      clearedPhoneStr = clearedPhoneStr.substr(0, 12);
      
    return clearedPhoneStr;
  }