
let windowObjectReference : Window | null = null;
let previousUrl : string | null = null;

let popCallBack:  ((event: MessageEvent) => void) | undefined

const w = 601
const h = 700

const receiveMessage = (event : MessageEvent) => {
    // Do we trust the sender of this message? (might be
    // different from what we originally opened, for example).
    if (event.origin !== process.env.REACT_APP_BACKEND_URL) {
        return;
    }

    if (typeof event.data === 'object' && event.data !== null && event.data.action === 'auth' && popCallBack) {
        popCallBack(event)
        window.removeEventListener('message', receiveMessage)
    }
}

/**
 *
 * @param url
 * @param name
 * @param callback
 * @see https://dev.to/dinkydani21/how-we-use-a-popup-for-google-and-outlook-oauth-oci
 * @see https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
 */
const openSignInWindow = (url : string, name : string, callback? : (event: MessageEvent) => void) => {
    popCallBack = callback

    // remove any existing event listeners
    window.removeEventListener('message', receiveMessage)

    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX
    const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop

    // window features
    const strWindowFeatures = `toolbar=no, menubar=no, width=${w / systemZoom}, height=${h / systemZoom}, top=${top}, left=${left}`

    if (windowObjectReference === null || windowObjectReference.closed) {
        /* if the pointer to the window object in memory does not exist
         or if such pointer exists but the window was closed */
        windowObjectReference = window.open(url, name, strWindowFeatures)
    } else if (previousUrl !== url) {
        /* if the resource to load is different,
         then we load it in the already opened secondary window and then
         we bring such window back on top/in front of its parent window. */
        windowObjectReference = window.open(url, name, strWindowFeatures)
        windowObjectReference?.focus()
    } else {
        /* else the window reference must exist and the window
         is not closed; therefore, we can bring it back on top of any other
         window with the focus() method. There would be no need to re-create
         the window or to reload the referenced resource. */
        windowObjectReference.focus()
    }

    // add the listener for receiving a message from the popup
    window.addEventListener('message', receiveMessage, false)
    // assign the previous URL
    previousUrl = url
}

export default openSignInWindow
