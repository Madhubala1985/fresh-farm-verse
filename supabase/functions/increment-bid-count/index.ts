
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      // Supabase API URL - env var exposed by default when deployed
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exposed by default when deployed
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { headers: { Authorization: req.headers.get('Authorization')! } },
      }
    );
    
    // Get the user who made the request
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', message: userError.message }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }
    
    // Get the request data
    const { auctionId } = await req.json();
    
    if (!auctionId) {
      return new Response(
        JSON.stringify({ error: 'Missing fields', message: 'Auction ID is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Get the current auction data
    const { data: auction, error: auctionError } = await supabaseClient
      .from('auctions')
      .select('*')
      .eq('id', auctionId)
      .single();
    
    if (auctionError) {
      return new Response(
        JSON.stringify({ error: 'Auction not found', message: auctionError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }
    
    // Increment the bid count
    const { data: updated, error: updateError } = await supabaseClient
      .from('auctions')
      .update({ bid_count: (auction.bid_count || 0) + 1 })
      .eq('id', auctionId)
      .select()
      .single();
    
    if (updateError) {
      return new Response(
        JSON.stringify({ error: 'Failed to update auction', message: updateError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    return new Response(
      JSON.stringify({ success: true, data: updated }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
