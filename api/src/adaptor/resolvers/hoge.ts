export const hoge = (_root: any, _args: any, ctx: any) => {
    console.log(ctx.user);
    return {foo: "foo", bar: 1};
};
