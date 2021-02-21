import React from 'react'
import Typed from 'react-typed'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import markdown from './Markdown'
import './Documentation.scss'

export const Documentation = () => {
    const c1 = 
``

return <ReactMarkdown plugins={[gfm]} children={markdown} />
//     return (
//         <div className="no-bottom no-top" id="content">
//             <section className="full-height documentation-section">
//                 <h1>Simple Model</h1>
//                 <p>Types are similar of types in graphql <a href="https://graphql.org/learn/schema/">https://graphql.org/learn/schema/</a></p>
//                 <pre><code>
//                 {c1}
//                 </code></pre>
//                 <p>
//                     The language is pretty readable, but let's go over it so that we can have a shared vocabulary:
//                 </p>


// </p>

//             </section>

//             <section className="full-height vertical-center">
//             </section>
//         </div>
//     );
}

export default Documentation