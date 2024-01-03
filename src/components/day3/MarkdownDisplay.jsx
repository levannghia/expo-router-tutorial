import { ScrollView } from 'react-native'
import React from 'react'
import Markdown from 'react-native-markdown-display';

const MarkdownDisplay = ({children}) => {
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
        >
            <Markdown
                style={{
                    body: { color: 'black', fontSize: 13, fontFamily: 'Inter' },
                    heading1: { color: 'purple' },
                    code_block: { color: 'black', fontSize: 14 }
                }}
            >
                {children}
            </Markdown>
        </ScrollView>
    )
}

export default MarkdownDisplay

