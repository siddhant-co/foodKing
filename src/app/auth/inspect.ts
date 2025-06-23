async function inspectRegistrationSchema() {
  const res = await fetch('https://nxadmin.consociate.co.in/user/customer-registration/', {
    method: 'OPTIONS',
    headers: { 'Content-Type': 'application/json' },
  });
  const schema = await res.json();
  console.log('Schema from OPTIONS:', schema);
}
