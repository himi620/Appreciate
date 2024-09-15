import dbConnect from '../../../../lib/mongodb.js';
import FAQ from '../../../../models/FAQ.js';


export async function DELETE(req) {
  await dbConnect();

  const id = req.url.split('/').pop();  
  console.log(id);
  if (!id) {
    return new Response(
      JSON.stringify({ error: 'FAQ ID is required for deletion' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(id);

    console.log(deletedFAQ);
  
    if (!deletedFAQ) {
      return new Response(
        JSON.stringify({ error: 'FAQ not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify({ message: 'FAQ deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Delete Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete FAQ' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}


export async function PATCH(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); 
  console.log(id);

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'FAQ ID is required for updating' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const body = await req.json();
    const { title, content, image } = body;

    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      { title, content, image },
      { new: true, runValidators: false }
    );

    if (!updatedFAQ) {
      return new Response(
        JSON.stringify({ error: 'FAQ not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify(updatedFAQ), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Update Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update FAQ' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
