import { Suspense } from 'react'
import Loading from './loading'
import MyPosts from './page'

export default function MyPostLayout() {

    return (
        <Suspense fallback={<Loading />}>
            <MyPosts />
        </Suspense>
    )
}
