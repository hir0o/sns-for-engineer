export const post = async <R extends object>(
  url: string,
  obj: any
): Promise<R> => {
  try {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((res) => res.json())
  } catch (e) {
    throw new Error('送信に失敗しました。')
  }
}
