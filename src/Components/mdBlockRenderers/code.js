import React, { Component } from 'react';
import { highlight, languages } from 'prismjs';
import ReactHtmlParser from 'react-html-parser';
import 'prismjs/themes/prism.css';

export default class extends Component {
    render() {
        const html = highlight(this.props.value, languages[this.props.language]);
        const cls = `language-${this.props.language}`;
        return (
            <pre className={cls}>
                <code className={cls}>
                    {ReactHtmlParser(html)}
                </code>
            </pre>
        );
    }
}