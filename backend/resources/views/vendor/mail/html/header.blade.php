@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="https://firebasestorage.googleapis.com/v0/b/say-date.appspot.com/o/icon-removebg-preview.png?alt=media&token=5b0e6048-39ed-4bfc-aba2-a7891608e159" class="logo" alt="Recruithub Logo">
@else
<center>
<img src="https://firebasestorage.googleapis.com/v0/b/say-date.appspot.com/o/icon-removebg-preview.png?alt=media&token=5b0e6048-39ed-4bfc-aba2-a7891608e159" class="logo" alt="Recruithub Logo">
<div>{{ $slot }}</div>
</center>
@endif 
</a>
</td>
</tr>
