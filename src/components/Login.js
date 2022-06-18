import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slice/authSlice'

const Login = () => {
	const AUTH_URL = `https://accounts.spotify.com/authorize`
	const REDIRECT_URL = `http://localhost:3000`
	const CLIEND_ID = `5c1c10397b024e6383b39d35e0c2eab8`
	const RESPONSE_TYPE = `code`

	return (
		<div className='w-full h-screen bg-slate-200'>
			<div className='bg-white w-1/2 absolute left-1/2 rounded-md -translate-x-1/2 top-1/2 -translate-y-1/2 shadow-lg p-4'>
				<video
					autoPlay
					preload='auto'
					controls
					poster='https://s199.imacdn.com/vg/2022/06/06/abfd23b4e8a19f48_dc50e79fe757abec_3679616544527632118684.jpg'
					src='https://scontent.cdninstagram.com/v/t39.25447-2/10000000_330482765927812_4530677505048760516_n.mp4?_nc_cat=109&vs=7fecc9833029c063&_nc_vs=HBksFQAYJEdJQ1dtQUNFRmQ2RGtpd0JBTVRRU0xBdk1fQV9ibWRqQUFBRhUAAsgBABUAGCRHSUNXbUFBcmdQdXJ0LVVCQUlJTHdCVUtUQXRUYnJGcUFBQUYVAgLIAQBLBogScHJvZ3Jlc3NpdmVfcmVjaXBlATENc3Vic2FtcGxlX2ZwcwAQdm1hZl9lbmFibGVfbnN1YgAgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AEWRpc2FibGVfcG9zdF9wdnFzABUAJQAcAAAm4u%2F2h8399QEVkE4oAkMzGAt2dHNfcHJldmlldxwXQJXwHbItDlYYKWRhc2hfaTRsaXRlYmFzaWNfNXNlY2dvcF9ocTJfZnJhZ18yX3ZpZGVvEgAYGHZpZGVvcy52dHMuY2FsbGJhY2sucHJvZDgSVklERU9fVklFV19SRVFVRVNUGw%2BIFW9lbV90YXJnZXRfZW5jb2RlX3RhZwZvZXBfaGQTb2VtX3JlcXVlc3RfdGltZV9tcwEwDG9lbV9jZmdfcnVsZQd1bm11dGVkE29lbV9yb2lfcmVhY2hfY291bnQBMBFvZW1faXNfZXhwZXJpbWVudAAMb2VtX3JvaV9ub3RlC3Byb2dyZXNzaXZlEW9lbV9yb2lfdXNlcl90aWVyAB5vZW1fcm9pX3ByZWRpY3RlZF93YXRjaF90aW1lX3MBMBZvZW1fcm9pX3JlY2lwZV9iZW5lZml0BTAuMDAwJW9lbV9yb2lfc3RhdGljX2JlbmVmaXRfY29zdF9ldmFsdWF0b3ILcHJvZ3Jlc3NpdmUMb2VtX3ZpZGVvX2lkDzM5NjMwNTc0OTA5MTA0NxJvZW1fdmlkZW9fYXNzZXRfaWQPNDA5ODgwMjU0MzYwMjgxFW9lbV92aWRlb19yZXNvdXJjZV9pZA81NDA5MTg1MjQzMzcxMzccb2VtX3NvdXJjZV92aWRlb19lbmNvZGluZ19pZA8zNzYyMTgxMzEzMDQxMTAOdnRzX3JlcXVlc3RfaWQPM2QwNDBjMDFlZWZlNDhhJQIcHBwV8OYXGwFVAAIbAVUAAhwVAgAAABaAurcDACXEARsHiAFzAzEwOQJjZAoyMDIyLTA2LTA1A3JjYgEwA2FwcAVWaWRlbwJjdBlDT05UQUlORURfUE9TVF9BVFRBQ0hNRU5UE29yaWdpbmFsX2R1cmF0aW9uX3MHMTQwNC4xMQJ0cxVwcm9ncmVzc2l2ZV9lbmNvZGluZ3MA&ccb=1-7&_nc_sid=41a7d5&_nc_ohc=378cvZj-t4kAX9DZbAq&_nc_ht=video-frx5-2.xx&edm=APRAPSkEAAAA&oh=00_AT9wTsjv1ZlPgnjRt2gg7_x4r8XZ1qFikbaXBtfZcKYYAw&oe=62AE13E0&_nc_rid=141737165336118'
				></video>
				<h1 className='text-3xl mb-10 text-center'>Login</h1>

				<a
					href={`${AUTH_URL}?client_id=${CLIEND_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}`}
					className='w-full bg-green-500 text-white py-4 rounded inline-block text-center'
				>
					Đăng nhập bằng spotify
				</a>
			</div>
		</div>
	)
}

export default Login
