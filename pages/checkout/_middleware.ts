import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';


export async function middleware( req: NextRequest | any, ev: NextFetchEvent ) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if ( !session ) {
        // const requestedPage = req.page.name
        // return NextResponse.redirect(`/auth/login?p=${ requestedPage }`);
        const url = req.nextUrl.clone()
        url.pathname = '/auth/login';
        url.search = `p=${req.page.name}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();

    // const { token = '' } = req.cookies;

    // try {
    //     await jwt.isValidToken( token );
    //     return NextResponse.next();

    // } catch (error) {
    //     const requestedPage = req.page.name
    //     return NextResponse.redirect(`http://localhost:3000/auth/login?p=${ requestedPage }`)
    // }

}