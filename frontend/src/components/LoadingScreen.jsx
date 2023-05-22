import { ImSpinner2 } from 'react-icons/im'

function LoadingScreen() {
    return <div className='dialog_bg' style={{zIndex:10000}}>
        <div className='spinner'>
            <ImSpinner2 />
        </div>
    </div>
}

export default LoadingScreen;