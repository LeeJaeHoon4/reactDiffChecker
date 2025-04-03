import { Routes, Route} from 'react-router-dom';
import BearPage from '@/pages/BearPage';
import CodeReview from "@/pages/codeReview";
import CodeHist from "@/pages/codeHist";

function RouterConfig(){
    return (
        <Routes>
            <Route path="/" element={<BearPage  />} />
            <Route path="/codeReview" element={<CodeReview />} />
            <Route path="/codeHist" element={<CodeHist />} />
        </Routes>
    );
}

export default RouterConfig;