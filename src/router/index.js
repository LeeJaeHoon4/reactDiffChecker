import {
    Routes,
    Route
} from 'react-router-dom';
import BearPage from '@/pages/BearPage';
import CodeReview from "@/pages/codeReview";

function RouterConfig(){
    return (
        <Routes>
            <Route path="/" element={<BearPage  />} />
            <Route path="/codeReview" element={<CodeReview />} />
        </Routes>
    );
}

export default RouterConfig;