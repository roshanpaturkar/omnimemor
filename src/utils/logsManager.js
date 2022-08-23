export const customLogger = (data) => {
    console.log(`<<<<< ${data} >>>>>`);
}

export const httpErrorLogger = (err) => {
    console.log(
      '<<<<<',
      err.response.status,
      err.response.statusText,
      err.response.data.error,
      '>>>>>'
    );
}