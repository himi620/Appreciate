import dbConnect from '../../../lib/mongodb.js';
import FAQ from '../../../models/FAQ.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dhvfznd9x',
  api_key: '846937789899568',
  api_secret: 'qWPoI5oTzJG5lz0oqdMNbW7nIgs',
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// Disable the default body parser for the POST method
export const POST = async (req) => {
  await dbConnect();

  try {
    // Use middleware for file uploads
    await runMiddleware(req, {}, upload.single('image'));

    const formData = await req.formData();
    console.log("👹", formData);

    const title = formData.get('title');
    const content = formData.get('content');
    const file = formData.get('image');  

    console.log("🥱", title, content, file);

    if (!title || !content || !file) {
      return new Response(
        JSON.stringify({ error: 'Title, content, and image are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            return reject(new Error('Failed to upload image'));
          }
          resolve(result);
        }
      );
      stream.end(buffer); 
    });

    const newFAQ = new FAQ({
      title,
      content,
      image: uploadResult.secure_url, 
    });
    await newFAQ.save();

    return new Response(JSON.stringify(newFAQ), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to create FAQ' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// Other handlers remain unchanged
export async function GET(req) {
  await dbConnect();

  try {
    const faqs = await FAQ.find({});
    return new Response(JSON.stringify(faqs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch FAQs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

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
      { new: true, runValidators: true }
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

export async function OPTIONS(req) {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: 'GET, POST, DELETE, PATCH',
    },
  });
}
