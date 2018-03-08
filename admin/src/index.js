import dva from 'dva';
import './index.css';
import './assets/app.global.css'

// 1. Initialize
const app = dva();


// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require("./models/appList"));

app.model(require("./models/common"));

app.model(require("./models/appDetail"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
