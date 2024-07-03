

function onWindowLoad() {
    var extractButton = document.getElementById('extractButton');
    var btnGetSendZNS = document.getElementById('btnGetSendZNS');
    var htmlOutput = document.getElementById('htmlOutput');
    // htmlOutput.innerText = "ABCDEF";
    // click button - send ZNS message
    btnGetSendZNS.addEventListener('click', function() {

        chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
            var activeTab = tabs[0];
            var activeTabId = activeTab.id;
            return chrome.scripting.executeScript({
                target: { tabId: activeTabId },
                func: DOMtoString,
            });
        }).then(function (results) {
            var data_html = results[0].result;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://kinghome.vn/rss/get_data_zns");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 400) {
                    alert(xhr.responseText);
                } 
            };
            xhr.send(JSON.stringify({html: data_html}));
        }).catch(function (error) {
            htmlOutput.innerText = 'Không thể lấy được dữ liệu: ' + error.message;
        });
    });
    
    // Click button - for mobile app
    extractButton.addEventListener('click', function() {

        chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
            var activeTab = tabs[0];
            var activeTabId = activeTab.id;

            return chrome.scripting.executeScript({
                target: { tabId: activeTabId },
                func: DOMtoString,
            });

        }).then(function (results) {
            var data_html = results[0].result;
            // htmlOutput.innerText = data_html;
            // Call ajax
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://kinghome.vn/rss/get_order");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = function() {
                // if (xhr.status === 200) {
                //     console.log("Data sent to API.");
                // }
                /**
                 * order_code: mã đơn hàng
                 * order_total: tổng tiền đơn hàng
                 * customer_name: tên khách hàng
                 * customer_phone: điện thoại KH
                 * customer_address: đia chỉ KH
                 * 
                 */
                if (xhr.status >= 200 && xhr.status < 400) {
                    // var data = JSON.parse(xhr.responseText);
                    // console.log(data.order_code);
                    // htmlOutput.innerHTML(xhr.responseText);
                    // alert(JSON.parse(xhr.responseText));
                    alert(xhr.responseText);
                } else {
                
                }
            };
            xhr.send(JSON.stringify({html: data_html}));
        }).catch(function (error) {
            htmlOutput.innerText = 'Không thể lấy được dữ liệu: ' + error.message;
        });
    });
}

window.onload = onWindowLoad;

function DOMtoString(selector) {
    if (selector) {
        selector = document.querySelector(selector);
        if (!selector) return "ERROR: querySelector failed to find node"
    } else {
        selector = document.documentElement;
    }
    return selector.outerHTML;
}

// document.addEventListener('DOMContentLoaded', function() {
    
//     var extractButton = document.getElementById('extractButton');
//     var htmlOutput = document.getElementById('htmlOutput');
//     var tabHtml = document.body.parentElement.innerHTML;
//     htmlOutput.innerText = "ABCDEF";

//     extractButton.addEventListener('click', function() {
//         htmlOutput.innerText = tabHtml;

//         // chrome.tabs.getSelected(null, function(tab) {
//         //     chrome.tabs.sendRequest(tab.id, {method: "getText"}, function(response) {
//         //         if(response.method == "getText"){
//         //             alltext = response.data;
//         //             htmlOutput.innerText = alltext;
//         //         }
//         //     });
//         // });

//         // chrome.tabs.executeScript({
//         //     code: "document.documentElement.innerHTML" // or 'file: "getPagesSource.js"'
//         // }, function(result) {
//         //     if (chrome.runtime.lastError) {
//         //         console.error(chrome.runtime.lastError.message);
//         //     } else {
//         //         console.log(result)
//         //     }
//         // });

//         // chrome.tabs.executeScript({code: 'document.documentElement.outerHTML'}, function(result) {
//         //     htmlOutput.innerText = result[0];
//         //     // send to API
//         //     var xhr = new XMLHttpRequest();
//         //     xhr.open("POST", "https://kinghome.vn/rss/get_order");
//         //     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//         //     xhr.onload = function() {
//         //         htmlOutput.innerHTML('Hello Thien')
//         //         // if (xhr.status === 200) {
//         //         //     console.log("Data sent to API.");
//         //         // }
//         //         /**
//         //          * order_code: mã đơn hàng
//         //          * order_total: tổng tiền đơn hàng
//         //          * customer_name: tên khách hàng
//         //          * customer_phone: điện thoại KH
//         //          * customer_address: đia chỉ KH
//         //          * 
//         //          */
//         //         if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
//         //             var data = JSON.parse(xmlhttp.responseText);
//         //             console.log(data.order_code);
//         //         } else {
                
//         //         }
//         //     };
//         //     xhr.send(JSON.stringify({html: result[0]}));
//         // });
//     });
// });
  