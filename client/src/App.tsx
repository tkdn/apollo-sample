import * as React from "react";

export const App: React.FC<{test: string}> = props => {
    const { test } = props;
    throw new Error(test);
    return <div>{test}</div>;
};
