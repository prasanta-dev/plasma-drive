import React, { useState } from 'react'
import addServices from '../../services/AddServices'
import FormUI from '../../components/Form/FormUI'

const slugify = (text) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

function AddServicePanel() {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [slugTouched, setSlugTouched] = useState(false)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [active, setActive] = useState(true)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState(null) // { type: 'success' | 'error', text: string }

    const handleTitleChange = (e) => {
        const value = e.target.value
        setTitle(value)
        if (!slugTouched) setSlug(slugify(value))
    }

    const handleSlugChange = (e) => {
        setSlugTouched(true)
        setSlug(slugify(e.target.value))
    }

    const handleFileChange = (e) => {
        const selected = e.target.files?.[0]
        if (!selected) return
        setFile(selected)
        setPreview(URL.createObjectURL(selected))
    }

    const resetForm = () => {
        setTitle('')
        setSlug('')
        setSlugTouched(false)
        setDescription('')
        setCategory('')
        setPrice('')
        setActive(true)
        setFile(null)
        setPreview(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !slug || !category || !price) {
            setStatus({ type: 'error', text: 'Fill in title, category and price before saving.' })
            return
        }

        setSubmitting(true)
        setStatus(null)

        let imageId = null
        try {
            if (file) {
                const uploaded = await addServices.uploadFile(file)
                imageId = uploaded.$id
            }

            await addServices.addService({
                title: title.trim(),
                slug,
                description: description.trim(),
                category: category.trim(),
                price: Number(price),
                imageId,
                active,
            })

            setStatus({ type: 'success', text: `"${title}" was added to Services.` })
            resetForm()
        } catch (error) {
            // if the image uploaded but the document failed, clean it up
            if (imageId) {
                addServices.deleteFile(imageId).catch(() => {})
            }
            setStatus({ type: 'error', text: 'Something went wrong while saving. Please try again.' })
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-neutral-900">Add a service</h1>
                <p className="text-sm text-neutral-500 mt-1">
                    New services appear on the Services page once saved.
                </p>
            </div>

            {status && (
                <div
                    className={`mb-5 px-4 py-3 rounded-lg text-sm border ${
                        status.type === 'success'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-rose-50 border-rose-200 text-rose-700'
                    }`}
                >
                    {status.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-lg">
                <FormUI
                    lableText="Service title"
                    htmlFor="title"
                    id="title"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Washing Machine Repair"
                    requried
                />

                <FormUI
                    lableText="Slug (URL-friendly)"
                    htmlFor="slug"
                    id="slug"
                    type="text"
                    value={slug}
                    onChange={handleSlugChange}
                    placeholder="washing-machine-repair"
                    requried
                />

                <FormUI
                    lableText="Category"
                    htmlFor="category"
                    id="category"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Appliance Repair"
                    requried
                />

                <FormUI
                    lableText="Price (₹)"
                    htmlFor="price"
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="499"
                    requried
                />

                <FormUI
                    inputAttribute="textArea"
                    lableText="Description"
                    htmlFor="description"
                    id="description"
                    type="text"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Shown on the service card..."
                />

                {/* Image upload */}
                <div className="mb-4">
                    <div className="flex flex-col relative group">
                        <label
                            htmlFor="image"
                            className="text-blue-500 text-[16px] font-semibold relative top-2 ml-3 px-1 bg-white w-fit rounded border shadow-md"
                        >
                            Service image
                        </label>
                        <div className="border-gray-200 border-2 rounded-[5px] shadow-md px-3 py-3 bg-white flex items-center gap-4">
                            {preview && (
                                <img src={preview} alt="" className="w-14 h-14 rounded-md object-cover shrink-0" />
                            )}
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="text-sm text-neutral-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-neutral-900 file:text-white file:text-sm file:cursor-pointer cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Active toggle */}
                <label className="flex items-center gap-2 mb-6 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                    />
                    <span className="text-sm text-neutral-700">
                        Visible on the Services page (active)
                    </span>
                </label>

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-neutral-900 text-white font-medium rounded-md px-5 py-2.5 text-sm hover:bg-neutral-800 transition disabled:opacity-50 cursor-pointer"
                >
                    {submitting ? 'Saving...' : 'Save service'}
                </button>
            </form>
        </div>
    )
}

export default AddServicePanel
