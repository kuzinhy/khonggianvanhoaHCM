import https from 'node:https';
import fs from 'node:fs';

https.get('https://kgvhhcm.hcmussh.edu.vn/static/js/main.cc580ca9.js', (res) => {
  const chunks = [];
  res.on('data', d => chunks.push(d));
  res.on('end', () => {
    const code = Buffer.concat(chunks).toString('utf8');
    const pos = code.indexOf('Amiral Latouche');
    console.log('Amiral Latouche index:', pos);

    // Find array z$
    const startObj = code.lastIndexOf('[', pos);
    const endObj = code.indexOf(']', pos + 50000);
    const slice = code.substring(startObj, endObj + 1);

    // Decode Unicode escape sequences
    const decoded = slice.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
                         .replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

    // Parse features using regex to avoid malformed eval
    const featureRegex = /\{type:"Feature",properties:\{([^}]+)\},geometry:\{coordinates:\[([^,\]]+),([^,\]]+)\],type:"Point"\}\}/g;
    const matches = [...decoded.matchAll(featureRegex)];
    console.log('Total extracted GeoJSON features:', matches.length);

    const points = matches.map((m, idx) => {
      const propStr = m[1];
      const lng = parseFloat(m[2]);
      const lat = parseFloat(m[3]);

      const idMatch = propStr.match(/id:(\d+)/);
      const changMatch = propStr.match(/chang:"([^"]+)"/);
      const placeMatch = propStr.match(/place:"([^"]+)"/);
      const noiDungMatch = propStr.match(/noi_dung:"([^"]+)"/);

      const chang2Match = propStr.match(/chang2:"([^"]+)"/);
      const place2Match = propStr.match(/place2:"([^"]+)"/);
      const noiDung2Match = propStr.match(/noi_dung2:"([^"]+)"/);

      return {
        id: idx + 1,
        pointId: idMatch ? parseInt(idMatch[1]) : idx + 1,
        stage: changMatch ? changMatch[1].trim() : 'Chặng 1',
        place: placeMatch ? placeMatch[1].trim() : '',
        content: noiDungMatch ? noiDungMatch[1].trim() : '',
        coords: { lng, lat },
        extraVisits: chang2Match ? [{ stage: chang2Match[1], place: place2Match ? place2Match[1] : '', content: noiDung2Match ? noiDung2Match[1] : '' }] : []
      };
    });

    console.log(`Successfully parsed ${points.length} points.`);
    console.log('Sample Point 1:', JSON.stringify(points[0], null, 2));
    console.log('Sample Point 60:', JSON.stringify(points[points.length - 1], null, 2));

    fs.writeFileSync('src/data/extractedUsshPoints.json', JSON.stringify(points, null, 2), 'utf8');
    console.log('Saved to src/data/extractedUsshPoints.json');
  });
});
