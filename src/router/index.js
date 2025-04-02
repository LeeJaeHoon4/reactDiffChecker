import {
    Routes,
    Route
} from 'react-router-dom';
import Body from '@/pages/Body';
import CodeReview from "@/pages/codeReview";

function RouterConfig(){
    return (
        <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/codeReview" element={<CodeReview />} />
        </Routes>
    );
}

export default RouterConfig;