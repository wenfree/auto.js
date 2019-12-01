var url = "http://cnn.nanbianwu.com/index.php/api/SingleCard/login";
    r = http.post(url, {
        id : "1",
        data : JSON.stringify({
            cardnum:"2ECB8428FE7DDD7B1DB96C865307B5A9",
            machine_code:"866351030850630"
          })
    });

log(r.body.string())