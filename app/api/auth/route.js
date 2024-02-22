export async function GET() {
    console.log('test GET');
    return Response.json({
        message: "Hello Anda"
    })
}