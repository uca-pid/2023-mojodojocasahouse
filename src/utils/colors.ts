export const colorGradientSample = (color_a_hex: string, color_b_hex: string, samples: number) => {
  let hex_arr_color_a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color_a_hex);
  let hex_arr_color_b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color_b_hex);

  // Check if inputs are valid
  if(!hex_arr_color_a || !hex_arr_color_b){ 
    console.error("Colors must be given in (#000000 to #ffffff) range");
    return;
  }

  // Normalize colors from hex to 0...255
  let [r_1, g_1, b_1] = [parseInt(hex_arr_color_a[1], 16), parseInt(hex_arr_color_a[2], 16), parseInt(hex_arr_color_a[3], 16)];
  let [r_2, g_2, b_2] = [parseInt(hex_arr_color_b[1], 16), parseInt(hex_arr_color_b[2], 16), parseInt(hex_arr_color_b[3], 16)];

  // Calculate deltas
  let delta_red   = r_2 - r_1;
  let delta_green = g_2 - g_1;
  let delta_blue  = b_2 - b_1;

  // Get samples
  let sample_red: string, sample_green: string, sample_blue: string;
  let result_samples: string[] = [];
  for (let i = 0; i < samples; i++){
    sample_red = Math.round(r_1 + i*(delta_red/samples)).toString(16);
    sample_red.length == 1? sample_red = "0" + sample_red : null;
    sample_green = Math.round(g_1 + i*(delta_green/samples)).toString(16);
    sample_green.length == 1? sample_green = "0" + sample_green : null;
    sample_blue = Math.round(b_1 + i*(delta_blue/samples)).toString(16);
    sample_blue.length == 1? sample_blue = "0" + sample_blue : null;
    result_samples.push( "#" + sample_red + sample_green + sample_blue );
  }
  return result_samples;
};

